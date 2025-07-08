import amqp from 'amqplib';

const queue = 'images';

async function startWorker() {
  const connection = await amqp.connect('amqp://localhost');
  const channel = await connection.createChannel();

  await channel.assertQueue(queue, { durable: true });
  channel.prefetch(1); // Process one message at a time

  console.log(`[x] Waiting for tasks...`);

  channel.consume(queue, async (msg) => {
    if (!msg) return;

    const content = msg.content.toString();
    console.log(`[>] Received task: ${content}`);

    /*// Simulate work
    await new Promise((res) => setTimeout(res, 1000));*/

    console.log(`[✓] Task done: ${content}`);
    channel.ack(msg);
  });
}

startWorker();
