import { v4 as uuidv4 } from 'uuid';
import S3ClientWrapper from './S3ClientWrapper';
import { GetObjectCommand, PutObjectCommand } from '@aws-sdk/client-s3';
import { fileTypeFromBuffer } from 'file-type';
import { Readable } from 'stream';
import { FileResponse } from '../model/FileResponse';

export default class S3FileHandler {
  private s3Client;
  private imageBucketName = 'images';

  public constructor() {
    this.s3Client = S3ClientWrapper.getInstance();
  }

  private generateFileName(extension: string): string {
    return `${uuidv4()}.${extension}`;
  }

  private async detectMimeType(buffer: Buffer): Promise<{ mime: string; ext: string } | undefined> {
    const fileType = await fileTypeFromBuffer(buffer);
    return fileType; // e.g., { ext: 'png', mime: 'image/png' }
  }

  public async upload(fileBuffer: Buffer): Promise<string> {
    const fileType = await this.detectMimeType(fileBuffer);

    if (!fileType) {
      throw new Error('Unsupported or undetectable file type.');
    }

    const fileName = this.generateFileName(fileType!.ext);

    const command = new PutObjectCommand({
      Bucket: this.imageBucketName,
      Key: fileName,
      Body: fileBuffer,
      ContentType: fileType!.mime,
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
