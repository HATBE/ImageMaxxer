import { Request, Response } from 'express';
import JsonResponse from '../models/jsonReponse/JsonResponse';
import ImageUploader from '../image/ImageUploader';

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

    // TODO: staging db

    res.send(imagePath);
  }

  public async convert(req: Request, res: Response) {
    // process image
    //const file = await sharp(fileBuffer).rotate().toFormat('jpeg').toBuffer();
  }

  public async getRaw(req: Request, res: Response) {
    const folder = `${__dirname}/../../data/images/`;
    const rawImagePath: string = req.params.name || 'default.png';

    // TODO: check if user can access image

    try {
      res.sendFile(ImageUploader.checkPath(rawImagePath, folder));
    } catch (error) {
      return res.status(400).json(JsonResponse._404(`Kein Bild gefunden.`));
    }
  }
}
