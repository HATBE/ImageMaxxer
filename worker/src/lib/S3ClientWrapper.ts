import { S3Client } from '@aws-sdk/client-s3';

export default class S3ClientWrapper {
  private static instance: S3Client;

  private constructor() {}

  public static getInstance(): S3Client {
    if (!S3ClientWrapper.instance) {
      const endpoint = process.env.S3_ENDPOINT;
      const region = process.env.S3_REGION;
      const accessKeyId = process.env.S3_USER;
      const secretAccessKey = process.env.S3_PASSWORD;

      if (!endpoint || !region || !accessKeyId || !secretAccessKey) {
        throw new Error('Missing required S3 environment variables');
      }

      S3ClientWrapper.instance = new S3Client({
        endpoint,
        region,
        credentials: {
          accessKeyId,
          secretAccessKey,
        },
        forcePathStyle: true,
      });
    }
    return S3ClientWrapper.instance;
  }
}
