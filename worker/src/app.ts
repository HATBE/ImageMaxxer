import amqp from 'amqplib';
import dotenv from 'dotenv';
import S3FileHandler from './lib/S3FileHandler';
import sharp from 'sharp';
import { Readable } from 'stream';
import { FileResponse } from './model/FileResponse';
import ImageProcessor from './image/ImageProcessort';
import ImageEditOptions from './model/ImageEditOptions';

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

      const options: ImageEditOptions = {
        format: 'jpeg',
        resize: {
          width: 800,
          height: 200,
          fit: 'cover',
          upscale: true,
        },
        fillColor: '#ffffff',
        rotate: null,
        flipHorizontal: true,
        flipVertical: false,
        compressionQuality: 82,
        border: null,
        filters: null,
      };

      const imageProccessor = new ImageProcessor(imageBuffer, options);

      const processedImage = await imageProccessor.build();

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
