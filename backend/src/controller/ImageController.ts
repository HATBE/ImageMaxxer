import { Request, Response } from 'express';
import JsonResponse from '../models/jsonReponse/JsonResponse';
import sharp from 'sharp';
import path from 'path';
import fs, { existsSync, mkdirSync } from 'fs';
import { v4 as uuidv4 } from 'uuid';
import sanitize from 'sanitize-filename';

export default class ImageController {
  public async convertImage(req: Request, res: Response) {
    if (!req.file) {
      res.status(400).json(new JsonResponse(false, 'Please upload an image.').generate());
      return;
    }

    const fileBuffer = req.file.buffer;

    // process image
    const file = await sharp(fileBuffer).rotate().toFormat('jpeg').toBuffer();

    // save image
    const uploadDir = path.join(__dirname, `../../data/images`);

    if (!existsSync(uploadDir)) {
      mkdirSync(uploadDir);
    }

    const outputFilename = `${uuidv4()}.jpg`;
    const outputPath = path.join(uploadDir, outputFilename);

    try {
      await fs.promises.writeFile(outputPath, fileBuffer);
      res.send(outputFilename);
    } catch (err) {
      console.log(err);
      throw err;
    }

    // TODO: staging db

    /*res.set('Content-Type', `image/jpeg`);
    res.send(file);*/
  }

  public async getRaw(req: Request, res: Response) {
    const folder = `${__dirname}/../../data/images/`;
    const rawImagePath: string = req.params.name || 'default.png';

    // TODO: check if user can access image

    try {
      res.sendFile(this.checkPath(rawImagePath, folder));
    } catch (error) {
      return res.status(400).json(JsonResponse._404(`Kein Bild gefunden.`));
    }
  }

  private checkPath(rawImagePath: string, folder: string): string {
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
}
