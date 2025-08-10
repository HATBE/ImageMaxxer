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

    // TODO: check image sanitize ...

    try {
      const image = await this.imageService.upload(fileBuffer);

      res
        .status(201)
        .json(new JsonResponse(true, 'Image uploaded successfully', { image }).generate());
    } catch (err) {
      res.status(400).send(err);
    }
  }

  public async edit(req: Request, res: Response): Promise<void> {
    const id: string = req.params.id;
    const imageEditOptions: ImageEditOptions = req.body.options;

    const resId = await this.imageService.edit(id, imageEditOptions);

    res.status(201).json(new JsonResponse(true, 'success', { id: resId }).generate());
  }

  public async getRawFile(req: Request, res: Response): Promise<void> {
    // TODO: check if image exists
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
