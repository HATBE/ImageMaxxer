import { inject, injectable } from 'inversify';
import S3FileHandler from '../lib/S3FileHandler';
import ImageEditOptions from '../models/ImageEditOptions';
import amqp from 'amqplib';
import QueueImageMessage from '../models/QueueImageMessage';
import { v4 as uuidv4 } from 'uuid';
import FileHelper from '../lib/FileHelper';
import ImageRepository from '../repositories/ImageRepository';
import ImageDto from '../models/entities/image/ImageDto';
import { FileResponse } from '../models/FileResponse';
import ImageProcessingRepository from '../repositories/ImageProcessingRepository';
import ImageProcessingDto from '../models/entities/imageProcessing/ImageProcessingDto';

@injectable()
export default class ImageService {
  public constructor(
    @inject(S3FileHandler) private fileHandler: S3FileHandler,
    @inject(ImageRepository) private imageRepository: ImageRepository,
    @inject(ImageProcessingRepository) private imageProcessingRepository: ImageProcessingRepository
  ) {}

  public async upload(file: Buffer): Promise<ImageDto> {
    try {
      const id = uuidv4();
      const mimeType = await FileHelper.detectMimeType(file);

      if (!mimeType) {
        throw new Error('Unsupported or undetectable file type.');
      }

      const filepath = await this.fileHandler.upload(id, file);

      // TODO: later handle the userId with a loggedin User
      const image = await this.imageRepository.create(id, null, mimeType!.ext);

      return ImageDto.fromEntity(image);
    } catch (err) {
      throw err;
    }
  }

  public async edit(
    imageId: string,
    options: ImageEditOptions
  ): Promise<ImageProcessingDto | null> {
    // TODO: later make same calss as in worker hgere, connect with retry on app start not here on processing
    const connection = await amqp.connect('amqp://localhost');
    const channel = await connection.createChannel();

    await channel.assertQueue('images', { durable: true });
    // TODO: open ws or send ok message or something, just handle later that client checks a ws to check the state of the image? idk, lets wait and look maybe make a sql db thing or so, lets see

    const image = await this.imageRepository.getById(imageId);

    console.log(image);

    if (!image) {
      throw new Error('This image does not exist!');
    }

    // TODO: check if user owns image and stuff

    const processingId = uuidv4();

    await this.imageProcessingRepository.create(processingId, imageId);
    const imageProcessing = this.imageProcessingRepository.getById(processingId);

    const message: QueueImageMessage = {
      id: processingId,
      timestamp: Date.now(),
      options,
      imageId: image.id,
      extension: image.extension,
    };
    channel.sendToQueue('images', Buffer.from(JSON.stringify(message)), {
      persistent: true,
    });

    await channel.close();
    await connection.close();

    return ImageProcessingDto.fromEntity(imageProcessing);
  }

  public async getRawFile(fileName: string): Promise<FileResponse> {
    try {
      return this.fileHandler.get(fileName);
    } catch (err) {
      throw err;
    }
  }
}
