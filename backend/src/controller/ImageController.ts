import { Request, Response } from 'express';
import JsonResponse from '../models/jsonReponse/JsonResponse';
import ImageUploader from '../image/ImageUploader';
import { S3Client, PutObjectCommand, GetObjectCommand } from '@aws-sdk/client-s3';
import fs from 'fs';
import path from 'path';
import { Readable } from 'stream';

export default class ImageController {
  public async upload(req: Request, res: Response) {
    if (!req.file) {
      res.status(400).json(new JsonResponse(false, 'Please upload an image.').generate());
      return;
    }

    const fileBuffer = req.file.buffer;

    // TODO: check image sanitize ...

    // save image
    const imagePath = await ImageUploader.upload(fileBuffer);

    // TODO: DEBUG
    const s3 = new S3Client({
      endpoint: 'http://localhost:9000',
      region: 'us-east-1',
      credentials: {
        accessKeyId: 'minio',
        secretAccessKey: 'minio123',
      },
      forcePathStyle: true, // Required for MinIO
    });

    const command = new PutObjectCommand({
      Bucket: 'images',
      Key: 'uploaded-image.jpg', // The filename in the bucket
      Body: fileBuffer,
      ContentType: 'image/jpeg', // Optional: helps with serving files correctly
    });

    try {
      await s3.send(command);
      console.log('Upload successful.');
    } catch (err) {
      console.error('Upload failed:', err);
    }

    // TODO: staging db

    res.send(imagePath);
  }

  public async convert(req: Request, res: Response) {
    // process image
    //const file = await sharp(fileBuffer).rotate().toFormat('jpeg').toBuffer();
  }

  public async getRaw(req: Request, res: Response) {
    /*const folder = `${__dirname}/../../data/images/`;
    const rawImagePath: string = req.params.name || 'default.png';

    // TODO: check if user can access image

    try {
      res.sendFile(ImageUploader.checkPath(rawImagePath, folder));
    } catch (error) {
      return res.status(400).json(JsonResponse._404(`Kein Bild gefunden.`));
    }*/

    // TODO: DEBUG

    const s3 = new S3Client({
      endpoint: 'http://localhost:9000',
      region: 'us-east-1',
      credentials: {
        accessKeyId: 'minio',
        secretAccessKey: 'minio123',
      },
      forcePathStyle: true, // Required for MinIO
    });

    try {
      const command = new GetObjectCommand({
        Bucket: 'images',
        Key: 'uploaded-image.jpg',
      });

      const s3Response = await s3.send(command);

      if (!s3Response.Body) {
        return;
      }

      const stream = s3Response.Body as Readable;

      // Set optional headers (can infer type too)
      if (s3Response.ContentType) {
        res.setHeader('Content-Type', s3Response.ContentType);
      }

      // Pipe the stream to the client
      stream.pipe(res);
    } catch (error: any) {
      if (error.name === 'NoSuchKey') {
        return res.status(404).json(JsonResponse._404(`Bild  nicht gefunden.`));
      }

      console.error(' S3 image fetch failed:', error);
      return res.status(500).json(JsonResponse._404('Fehler beim Abrufen des Bildes.'));
    }
  }
}
