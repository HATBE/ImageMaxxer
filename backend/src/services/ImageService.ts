import { inject, injectable } from 'inversify';
import S3FileHandler from '../lib/S3FileHandler';
import ImageEditOptions from '../models/ImageEditOptions';
import amqp from 'amqplib';
import QueueImageMessage from '../models/QueueImageMessage';
import { v4 as uuidv4 } from 'uuid';
import FileHelper from '../lib/FileHelper';
import ImageRepository from '../repositories/ImageRepository';

@injectable()
export default class ImageService {
  public constructor(
    @inject(S3FileHandler) private fileHandler: S3FileHandler,
    @inject(ImageRepository) private imageRepository: ImageRepository
  ) {}

  public async upload(file: Buffer): Promise<string> {
    try {
      const id = uuidv4();
      const mimeType = await FileHelper.detectMimeType(file);

      if (!mimeType) {
        throw new Error('Unsupported or undetectable file type.');
      }

      const filepath = await this.fileHandler.upload(id, file);

      // TODO: later handle the userId with a loggedin User
      const image = await this.imageRepository.create(id, null, mimeType!.ext);

      return filepath;
    } catch (err) {
      throw err;
    }
  }

  public async edit(filepath: string, options: ImageEditOptions) {
    // TODO: later make same calss as in worker hgere, connect with retry on app start not here on processing
    const connection = await amqp.connect('amqp://localhost');
    const channel = await connection.createChannel();

    await channel.assertQueue('images', { durable: true });
    // TODO: open ws or send ok message or something, just handle later that client checks a ws to check the state of the image? idk, lets wait and look maybe make a sql db thing or so, lets see
    const genId = uuidv4();

    const message: QueueImageMessage = {
      id: genId,
      timestamp: Date.now(),
      options,
      path: filepath,
    };
    channel.sendToQueue('images', Buffer.from(JSON.stringify(message)), {
      persistent: true,
    });

    await channel.close();
    await connection.close();

    return genId;
  }

  public async getRawFile(fileName: string) {
    try {
      return this.fileHandler.get(fileName);
    } catch (err) {
      throw err;
    }
  }
}
