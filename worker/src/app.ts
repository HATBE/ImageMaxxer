import dotenv from 'dotenv';
import S3FileHandler from './lib/S3FileHandler';
import { Readable } from 'stream';
import { FileResponse } from './model/FileResponse';
import ImageProcessor from './image/ImageProcessort';
import RabbitMQConnector from './lib/RabbitMQConnector';
import QueueImageMessage from './model/QueueImageMessage';

dotenv.config();

const queue = 'images';

async function startWorker() {
  const connection = new RabbitMQConnector();
  await connection.connectWithRetry(`${process.env.QUEUE_HOSTNAME}`);

  await connection.getChannel().assertQueue(queue, { durable: true });
  connection.getChannel().prefetch(1); // process one message at a time

  console.log(`Waiting for tasks...`);

  connection.getChannel().consume(queue, async (msg) => {
    if (!msg) return;

    const content: QueueImageMessage = JSON.parse(msg.content.toString());

    console.log(`[>] Start task: ${content.id}`);

    try {
      const queueInfo = await connection.getChannel().checkQueue(queue);
      console.log(`Items in QUEUE: ${queueInfo.messageCount}`);

      console.log('Options:', content.options);

      const fileHandler = new S3FileHandler();

      const file: FileResponse = await fileHandler.get(content.path);

      const imageBuffer = await streamToBuffer(file.stream);

      const imageProccessor = new ImageProcessor(imageBuffer, content.options);

      const processedImage = await imageProccessor.build();

      fileHandler.upload(processedImage);

      console.log(`[✓] Task done: ${content.id}`);
    } catch (error) {
      console.error(`[!] Error processing task ${content.id}:`, error);
    } finally {
      connection.getChannel().ack(msg);
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
