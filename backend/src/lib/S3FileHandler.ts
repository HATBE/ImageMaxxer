import { injectable } from 'inversify';
import S3ClientWrapper from './s3Client';
import { GetObjectCommand, PutObjectCommand } from '@aws-sdk/client-s3';
import { Readable } from 'stream';
import { FileResponse } from '../models/FileResponse';
import FileHelper from './FileHelper';

@injectable()
export default class S3FileHandler {
  private s3Client;
  private imageBucketName = 'images';

  public constructor() {
    this.s3Client = S3ClientWrapper.getInstance();
  }

  public async upload(id: string, fileBuffer: Buffer): Promise<string> {
    const mimeType = await FileHelper.detectMimeType(fileBuffer);

    if (!mimeType) {
      throw new Error('Unsupported or undetectable file type.');
    }

    const fileName = FileHelper.generateFileName(id, mimeType!.ext);

    const command = new PutObjectCommand({
      Bucket: this.imageBucketName,
      Key: fileName,
      Body: fileBuffer,
      ContentType: mimeType!.mime,
    });

    try {
      await this.s3Client.send(command);
    } catch (err) {
      console.log(err);
      throw new Error('Upload failed');
    }
    return fileName;
  }

  public async get(fileName: string): Promise<FileResponse> {
    try {
      const command = new GetObjectCommand({
        Bucket: this.imageBucketName,
        Key: fileName,
      });

      const s3Response = await this.s3Client.send(command);

      if (!s3Response.Body) {
        throw new Error('File body is empty');
      }

      return {
        stream: s3Response.Body as Readable,
        contentType: s3Response.ContentType,
      };
    } catch (error: any) {
      if (error.name === 'NoSuchKey') {
        throw new Error('Bild nicht gefunden.');
      }

      console.error('S3 image fetch failed:', error);
      throw new Error('Fehler beim Abrufen des Bildes.');
    }
  }
}
