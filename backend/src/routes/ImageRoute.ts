import { Request, Response } from 'express';
import AbstractRoute from './AbstractRoute';
import upload from '../image/multerConfig';
import JsonResponse from '../models/jsonReponse/JsonResponse';
import sharp from 'sharp';

export default class ImageRoute extends AbstractRoute {
  constructor() {
    super();
  }

  protected async registerRoutes() {
    this.getRouter().post(
      '/convert/:format',
      upload.single('image'),
      async (req: Request, res: Response) => {
        if (!req.file) {
          res.status(400).json(new JsonResponse(false, 'Please upload an image.').generate());
          return;
        }

        const fileBuffer = req.file.buffer;

        const file = await sharp(fileBuffer).rotate().toFormat('jpeg').toBuffer();

        res.set('Content-Type', `image/jpeg`);
        res.send(file);
      }
    );
  }
}
