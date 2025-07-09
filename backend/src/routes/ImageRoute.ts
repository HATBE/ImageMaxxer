import { Request, Response } from 'express';
import AbstractRoute from './AbstractRoute';
import upload from '../image/multerConfig';
import ImageController from '../controller/ImageController';
import { param } from 'express-validator';
import validateRequest from '../middleware/validate-request';
import amqp from 'amqplib';
import { inject } from 'inversify';
import JsonResponse from '../models/jsonReponse/JsonResponse';

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
    this.getRouter().get('/testrabbitmq', async (req: Request, res: Response) => {
      const connection = await amqp.connect('amqp://localhost');
      const channel = await connection.createChannel();

      await channel.assertQueue('images', { durable: true });
      channel.sendToQueue('images', Buffer.from('HELLO FROM SERVER '), { persistent: true });

      console.log('Sent task');
      await channel.close();
      await connection.close();
      res.send('ok');
    });

    // TODO: REMOVE
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
