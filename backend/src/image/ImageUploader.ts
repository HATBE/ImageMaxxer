import path from 'path';
import fs, { existsSync, mkdirSync } from 'fs';
import { v4 as uuidv4 } from 'uuid';
import sanitize from 'sanitize-filename';

export default class ImageUploader {
  private static instance: ImageUploader;

  private constructor() {}

  public static getInstance(): ImageUploader {
    if (!ImageUploader.instance) {
      this.instance = new ImageUploader();
    }
    return ImageUploader.instance;
  }

  public static checkPath(rawImagePath: string, folder: string): string {
    const imageName = sanitize(rawImagePath);

    if (!imageName) {
      throw new Error('No Image Found');
    }

    const imagePath = path.resolve(folder, imageName);
    const imagesDir = path.resolve(folder);

    if (!imagePath.startsWith(imagesDir)) {
      throw new Error('No Image Found');
    }

    console.log(imagePath);

    if (!fs.existsSync(imagePath)) {
      throw new Error('No Image Found');
    }

    return imagePath;
  }

  public static async upload(fileBuffer: Buffer): Promise<string> {
    const uploadDir = path.join(__dirname, `../../data/images`);

    if (!existsSync(uploadDir)) {
      mkdirSync(uploadDir);
    }

    const outputFilename = `${uuidv4()}.jpg`;
    const outputPath = path.join(uploadDir, outputFilename);

    try {
      await fs.promises.writeFile(outputPath, fileBuffer);
      return outputFilename;
    } catch (err) {
      console.log(err);
      throw err;
    }
  }
}
