import { inject, injectable } from 'inversify';
import S3FileHandler from '../lib/S3FileHandler';
import ImageEditOptions from '../models/ImageEditOptions';
import amqp from 'amqplib';
import QueueImageMessage from '../models/QueueImageMessage';
import { v4 as uuidv4 } from 'uuid';

@injectable()
export default class ImageService {
  public constructor(@inject(S3FileHandler) private fileHandler: S3FileHandler) {}

  public async upload(file: Buffer): Promise<string> {
    try {
      // TODO: JUST FOR TESTING MOVE TO ROUTE LATER
      const options: ImageEditOptions = {
        format: 'gif',
        resize: {
          width: 6000,
          height: 5000,
          fit: 'contain',
          upscale: true,
        },
        fillColor: '#f0f0ff',
        rotate: 90,
        flipHorizontal: true,
        flipVertical: false,
        compressionQuality: 82,
        border: {
          topWidth: 10,
          bottomWidth: 10,
          leftWidth: 10,
          rightWidth: 10,
          color: '#ff0000',
        },
        filters: {
          brightness: 0.5,
          saturation: 0.5,
          blur: 2,
          grayscale: false,
          invert: false,
        },
      };

      /*return*/ const filepath = await this.fileHandler.upload(file);

      // TODO: later make same calss as in worker hgere, connect with retry on app start not here on processing
      const connection = await amqp.connect('amqp://localhost');
      const channel = await connection.createChannel();

      await channel.assertQueue('images', { durable: true });

      const message: QueueImageMessage = {
        id: uuidv4(),
        timestamp: Date.now(),
        options,
        path: filepath,
      };
      channel.sendToQueue('images', Buffer.from(JSON.stringify(message)), {
        persistent: true,
      });

      await channel.close();
      await connection.close();

      return filepath; // TODO: open ws or send ok message or something, just handle later that client checks a ws to check the state of the image? idk, lets wait and look maybe make a sql db thing or so, lets see
    } catch (err) {
      throw err;
    }
  }

  public async getRawFile(fileName: string) {
    try {
      return this.fileHandler.get(fileName);
    } catch (err) {
      throw err;
    }
  }
}
