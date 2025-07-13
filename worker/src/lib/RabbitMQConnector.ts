import amqp, { Channel, ChannelModel } from 'amqplib';

export default class RabbitMQConnector {
  private connection: ChannelModel | null = null;
  private channel: Channel | null = null;

  public async connectWithRetry(
    url: string,
    retries: number = 10,
    delay: number = 5000
  ): Promise<void> {
    for (let attempt = 1; attempt <= retries; attempt++) {
      try {
        this.connection = await amqp.connect(url);
        console.log(`Connected to RabbitMQ (attempt ${attempt})`);
        this.channel = await this.connection.createChannel();
        return;
      } catch (err) {
        console.error(`Connection failed (attempt ${attempt}/${retries})`);
        if (attempt === retries) throw err;
        await new Promise((res) => setTimeout(res, delay));
      }
    }
  }

  public getChannel(): Channel {
    if (!this.channel) {
      throw new Error('Channel is not initialized. Call connectWithRetry first.');
    }
    return this.channel;
  }
}
