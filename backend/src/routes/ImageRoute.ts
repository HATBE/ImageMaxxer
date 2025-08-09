import { Request, Response } from 'express';
import AbstractRoute from './AbstractRoute';
import upload from '../lib/multerConfig';
import ImageController from '../controller/ImageController';
import { body, param } from 'express-validator';
import validateRequest from '../middleware/validate-request';
import { inject } from 'inversify';
import JsonResponse from '../models/jsonReponse/JsonResponse';
import { imageEditOptionsValidator } from './validations/ImageEditOptionsValidator';

export default class ImageRoute extends AbstractRoute {
  public constructor(@inject(ImageController) private imageController: ImageController) {
    super();
  }

  protected async registerRoutes() {
    this.getRouter().post('/', upload.single('image'), async (req: Request, res: Response) => {
      if (!req.file) {
        res.status(400).json(new JsonResponse(false, 'Please upload an image.').generate());
        return;
      }

      this.imageController.upload(req, res);
    });

    this.getRouter().post(
      '/edit/:id',
      imageEditOptionsValidator,
      validateRequest,
      async (req: Request, res: Response) => {
        this.imageController.edit(req, res);
      }
    );

    this.getRouter().get(
      '/:name',
      param('name')
        .matches(/^[a-zA-Z0-9_\-\.]+$/)
        .withMessage('Invalid file name')
        .isLength({ min: 34, max: 40 }) // min value: uuid length (32) + dot (1) + ext of min 1 char = 34, max value = 40, maybe long ext?
        .withMessage('Filename must be inbetween of 34 and 255 characters')
        .escape(),
      validateRequest,
      async (req: Request, res: Response) => {
        this.imageController.getRawFile(req, res);
      }
    );
  }
}
