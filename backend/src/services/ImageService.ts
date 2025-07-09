import { inject, injectable } from 'inversify';
import S3FileHandler from '../image/S3FileHandler';
import { GetObjectCommand } from '@aws-sdk/client-s3';

@injectable()
export default class ImageService {
  public constructor(@inject(S3FileHandler) private fileHandler: S3FileHandler) {}

  public async upload(file: Buffer): Promise<string> {
    try {
      return await this.fileHandler.upload(file);
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
