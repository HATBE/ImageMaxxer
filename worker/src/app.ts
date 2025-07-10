import amqp from 'amqplib';
import dotenv from 'dotenv';

dotenv.config();

const queue = 'images';

async function connectWithRetry(
  url: string,
  retries = 10,
  delay = 5000
): Promise<amqp.ChannelModel> {
  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      const connection = await amqp.connect(url);
      console.log(`Connected to RabbitMQ (attempt ${attempt})`);
      return connection;
    } catch (err) {
      console.error(`Connection failed (attempt ${attempt}/${retries})`);
      if (attempt === retries) throw err;
      await new Promise((res) => setTimeout(res, delay));
    }
  }
  throw new Error('Unable to connect to RabbitMQ after retries');
}

async function startWorker() {
  const connection = await connectWithRetry(`${process.env.QUEUE_HOSTNAME}`);
  const channel = await connection.createChannel();

  await channel.assertQueue(queue, { durable: true });
  channel.prefetch(1); // Process one message at a time

  console.log(`[x] Waiting for tasks...`);

  channel.consume(queue, async (msg) => {
    if (!msg) return;

    const content = msg.content.toString();
    console.log(`[>] Received task: ${content}`);

    // Simulate work
    // await new Promise((res) => setTimeout(res, 1000));

    console.log(`[✓] Task done: ${content}`);
    channel.ack(msg);
  });
}

startWorker().catch((err) => {
  console.error('Worker failed to start:', err);
  process.exit(1);
});
