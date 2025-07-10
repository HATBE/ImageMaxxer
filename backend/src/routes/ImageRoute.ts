import { Request, Response } from 'express';
import AbstractRoute from './AbstractRoute';
import upload from '../image/multerConfig';
import ImageController from '../controller/ImageController';
import { param } from 'express-validator';
import validateRequest from '../middleware/validate-request';
import amqp from 'amqplib';
import { inject } from 'inversify';
import JsonResponse from '../models/jsonReponse/JsonResponse';
import { v4 as uuidv4 } from 'uuid';

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

    // TODO: REMOVE
    this.getRouter().get(
      '/:name',
      param('name')
        .matches(/^[a-zA-Z0-9_\-\.]+$/)
        .withMessage('Invalid file name')
        .isLength({ min: 34, max: 255 }) // min uuid (32) length + dot + ext of min 1 char
        .withMessage('Filename must be inbetween of 34 and 255 characters')
        .escape(),
      validateRequest,
      async (req: Request, res: Response) => {
        this.imageController.getRawFile(req, res);
      }
    );

    // TODO: REMOVE
    this.getRouter().put('/testrabbitmq', async (req: Request, res: Response) => {
      const connection = await amqp.connect('amqp://localhost');
      const channel = await connection.createChannel();

      await channel.assertQueue('images', { durable: true });
      for (let i = 0; i < 100; i++) {
        channel.sendToQueue('images', Buffer.from(uuidv4()), { persistent: true });
      }

      console.log('Sent task');
      await channel.close();
      await connection.close();
      res.send('ok');
    });
  }
}
