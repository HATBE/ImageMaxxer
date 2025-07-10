import amqp from 'amqplib';
import dotenv from 'dotenv';
import S3FileHandler from './lib/S3FileHandler';
import sharp from 'sharp';
import { Readable } from 'stream';
import { FileResponse } from './model/FileResponse';

dotenv.config();

const queue = 'images';

async function connectWithRetry(url: string, retries = 10, delay = 5000): Promise<amqp.Channel> {
  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      const connection = await amqp.connect(url);
      console.log(`Connected to RabbitMQ (attempt ${attempt})`);
      return connection.createChannel();
    } catch (err) {
      console.error(`Connection failed (attempt ${attempt}/${retries})`);
      if (attempt === retries) throw err;
      await new Promise((res) => setTimeout(res, delay));
    }
  }
  throw new Error('Unable to connect to RabbitMQ after retries');
}

async function startWorker() {
  const channel = await connectWithRetry(`${process.env.QUEUE_HOSTNAME}`);
  await channel.assertQueue(queue, { durable: true });
  channel.prefetch(1); // Process one message at a time

  console.log(`[x] Waiting for tasks...`);

  channel.consume(queue, async (msg) => {
    if (!msg) return;

    const content = msg.content.toString();
    console.log(`[>] Start task: ${content}`);

    try {
      const fileHandler = new S3FileHandler();
      const file: FileResponse = await fileHandler.get(content);

      const imageBuffer = await streamToBuffer(file.stream);

      const processedImage = await sharp(imageBuffer)
        .rotate() // Auto-rotate based on EXIF
        .resize({
          width: 4000, // Upscale if image is smaller (adds load)
          withoutEnlargement: false,
          fit: 'cover',
          kernel: sharp.kernel.lanczos3,
        })
        .blur(15) // Strong Gaussian blur — expensive
        .modulate({
          brightness: 1.2, // Simulate HDR boost
          saturation: 1.5,
          hue: 90,
        })
        .sharpen({
          sigma: 3,
          m1: 1.5,
          m2: 0.5,
          x1: 2,
          y2: 10,
          y3: 20,
        }) // Custom sharpening
        .linear(1.2, -30) // Contrast manipulation (multiply + bias)
        .gamma(2.2) // Apply gamma correction
        .toFormat('jpeg', {
          quality: 90,
          progressive: true,
          chromaSubsampling: '4:4:4',
        })
        .withMetadata({
          exif: {
            IFD0: {
              Artist: 'Systemaufwand Generator 9000',
              Copyright: '© 2025 by You',
            },
          },
        })
        .toBuffer();

      fileHandler.upload(processedImage);

      console.log(`[✓] Task done: ${content}`);
    } catch (error) {
      console.error(`[!] Error processing task ${content}:`, error);
    } finally {
      const queueInfo = await channel.checkQueue(queue);
      console.log(`QUEUE: ${queueInfo.messageCount}`);
      channel.ack(msg);
    }
  });
}

function streamToBuffer(stream: Readable): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    const chunks: Buffer[] = [];
    stream.on('data', (chunk) => chunks.push(chunk));
    stream.on('end', () => resolve(Buffer.concat(chunks)));
    stream.on('error', reject);
  });
}

startWorker().catch((err) => {
  console.error('Worker failed to start:', err);
  process.exit(1);
});
