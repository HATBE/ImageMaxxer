import { S3Client } from '@aws-sdk/client-s3';

// TODO: ENV
export default class S3ClientWrapper {
  private static instance: S3Client;

  private constructor() {}

  public static getInstance(): S3Client {
    if (!S3ClientWrapper.instance) {
      S3ClientWrapper.instance = new S3Client({
        endpoint: 'http://localhost:9000',
        region: 'us-east-1',
        credentials: {
          accessKeyId: 'minio',
          secretAccessKey: 'minio123',
        },
        forcePathStyle: true,
      });
    }
    return S3ClientWrapper.instance;
  }
}
