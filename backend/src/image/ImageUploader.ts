import { v4 as uuidv4 } from 'uuid';
import { injectable } from 'inversify';
import S3ClientWrapper from '../lib/s3Client';
import { PutObjectCommand } from '@aws-sdk/client-s3';
import { fileTypeFromBuffer } from 'file-type';

@injectable()
export default class ImageUploader {
  private s3Client;

  public constructor() {
    this.s3Client = S3ClientWrapper.getInstance();
  }

  private generateFileName(): string {
    const fileExtension = 'jpg';
    const fileName = `${uuidv4()}.${fileExtension}`;

    return fileName;
  }

  private async detectMimeType(buffer: Buffer): Promise<string | undefined> {
    const fileType = await fileTypeFromBuffer(buffer);
    console.log(fileType?.mime);
    return fileType?.mime; // e.g., 'image/jpeg'
  }

  public async upload(fileBuffer: Buffer): Promise<string> {
    const fileName = this.generateFileName();
    const fileType = await this.detectMimeType(fileBuffer);

    const command = new PutObjectCommand({
      Bucket: 'images',
      Key: fileName,
      Body: fileBuffer,
      ContentType: fileType,
    });

    try {
      await this.s3Client.send(command);
      console.log('Upload successful.');
    } catch (err) {
      console.error('Upload failed:', err);
    }
    return fileName;
  }
}
