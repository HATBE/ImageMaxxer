import { Request, Response } from 'express';
import AbstractRoute from './AbstractRoute';
import upload from '../lib/multerConfig';
import ImageController from '../controller/ImageController';
import { body, param } from 'express-validator';
import validateRequest from '../middleware/validate-request';
import { inject } from 'inversify';
import JsonResponse from '../models/jsonReponse/JsonResponse';
import { validateImageEditOptions } from './validations/ImageEditOptionsValidator';

export default class ImageRoute extends AbstractRoute {
  public constructor(@inject(ImageController) private imageController: ImageController) {
    super();
  }

  protected async registerRoutes() {
    this.getRouter().post(
      '/',
      upload.single('image'),
      body('format')
        .optional({ nullable: true })
        .isIn(['jpeg', 'jpg', 'png', 'gif', 'webp', 'tiff', 'avif', null])
        .withMessage('Invalid image format'),

      // resize
      body('resize')
        .optional({ nullable: true })
        .isObject()
        .withMessage('resize must be an object'),

      body('resize.width')
        .optional()
        .isInt({ min: 1 })
        .withMessage('width must be a positive integer'),

      body('resize.height')
        .optional()
        .isInt({ min: 1 })
        .withMessage('height must be a positive integer'),

      body('resize.fit')
        .optional()
        .isIn(['cover', 'contain', 'fill', 'inside', 'outside'])
        .withMessage('Invalid resize fit option'),

      body('resize.upscale').optional().isBoolean().withMessage('upscale must be a boolean'),

      // fillColor
      body('fillColor')
        .optional({ nullable: true })
        .isString()
        .matches(/^#([0-9A-F]{3}){1,2}$/i)
        .withMessage('fillColor must be a valid hex color'),

      // rotate
      body('rotate').optional({ nullable: true }).isInt().withMessage('rotate must be an integer'),

      // flip
      body('flipHorizontal').isBoolean(),
      body('flipVertical').isBoolean(),

      // compressionQuality
      body('compressionQuality')
        .optional({ nullable: true })
        .isInt({ min: 1, max: 100 })
        .withMessage('compressionQuality must be between 1 and 100'),

      // border
      body('border')
        .optional({ nullable: true })
        .isObject()
        .withMessage('border must be an object'),

      body('border.topWidth').optional().isInt({ min: 0 }),
      body('border.bottomWidth').optional().isInt({ min: 0 }),
      body('border.leftWidth').optional().isInt({ min: 0 }),
      body('border.rightWidth').optional().isInt({ min: 0 }),
      body('border.color')
        .optional()
        .isString()
        .matches(/^#([0-9A-F]{3}){1,2}$/i),

      // filters
      body('filters')
        .optional({ nullable: true })
        .isObject()
        .withMessage('filters must be an object'),

      body('filters.brightness')
        .optional({ nullable: true })
        .isFloat({ min: 0 })
        .withMessage('brightness must be a float >= 0'),

      body('filters.saturation')
        .optional({ nullable: true })
        .isFloat({ min: 0 })
        .withMessage('saturation must be a float >= 0'),

      body('filters.blur')
        .optional({ nullable: true })
        .isFloat({ min: 0 })
        .withMessage('blur must be a float >= 0'),

      body('filters.grayscale').isBoolean(),
      body('filters.invert').isBoolean(),
      async (req: Request, res: Response) => {
        if (!req.file) {
          res.status(400).json(new JsonResponse(false, 'Please upload an image.').generate());
          return;
        }

        this.imageController.upload(req, res);
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

    /*// TODO: REMOVE
    this.getRouter().put('/testrabbitmq', async (req: Request, res: Response) => {
      const connection = await amqp.connect('amqp://localhost');
      const channel = await connection.createChannel();

      await channel.assertQueue('images', { durable: true });
      // for (let i = 0; i < 100; i++) {
      channel.sendToQueue('images', Buffer.from('0d76b5c8-6730-4f01-bc04-1291ea8debe4.png'), {
        persistent: true,
      });
      //}

      console.log('Sent task');
      await channel.close();
      await connection.close();
      res.send('ok');
    });*/
  }
}
