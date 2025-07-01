import { Request, Response } from 'express';
import AbstractRoute from './AbstractRoute';
import upload from '../image/multerConfig';
import ImageController from '../controller/ImageController';
import { param } from 'express-validator';
import validateRequest from '../middleware/validate-request';

export default class ImageRoute extends AbstractRoute {
  private imageController: ImageController;

  constructor() {
    super();
    this.imageController = new ImageController();
  }

  protected async registerRoutes() {
    this.getRouter().post(
      '/convert/:format',
      upload.single('image'),
      async (req: Request, res: Response) => {
        this.imageController.convertImage(req, res);
      }
    );

    this.getRouter().get(
      '/raw/:name',
      param('name')
        .matches(/^[a-zA-Z0-9_\-\.]+$/)
        .withMessage('Invalid file name')
        .isLength({ min: 3, max: 255 })
        .withMessage('Filename must be inbetween of 3 and 255 characters')
        .escape(),
      validateRequest,
      async (req: Request, res: Response) => {
        this.imageController.getRaw(req, res);
      }
    );
  }
}
