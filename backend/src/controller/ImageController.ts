import { Request, Response } from 'express';
import { inject, injectable } from 'inversify';
import ImageService from '../services/ImageService';
import JsonResponse from '../models/jsonReponse/JsonResponse';
import ImageEditOptions from '../models/ImageEditOptions';

@injectable()
export default class ImageController {
  public constructor(@inject(ImageService) private imageService: ImageService) {}

  public async upload(req: Request, res: Response): Promise<void> {
    const fileBuffer = req.file!.buffer;
    const imageEditOptions: ImageEditOptions = req.body.options;

    // TODO: check image sanitize ...

    // save image
    try {
      const imagePath = await this.imageService.upload(fileBuffer, imageEditOptions);

      // TODO: staging db

      res
        .status(201)
        .json(
          new JsonResponse(true, 'Image uploaded successfully', { path: imagePath }).generate()
        );
    } catch (err) {
      res.status(400).send(err);
    }
  }

  public async getRawFile(req: Request, res: Response): Promise<void> {
    const imageName: string = req.params.name;

    if (!imageName) {
      res.status(400).send('NO PATH GIVEN');
      return;
    }

    try {
      const { stream, contentType } = await this.imageService.getRawFile(imageName);

      if (contentType) {
        res.setHeader('Content-Type', contentType);
      }

      stream.pipe(res);
    } catch (err) {
      res.status(500).send((err as Error).message || 'Error fetching file');
    }
  }
}
