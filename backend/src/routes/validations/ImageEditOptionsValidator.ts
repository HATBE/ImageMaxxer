import { body } from 'express-validator';

export const validateImageEditOptions = [
  // format
  body('format')
    .optional({ nullable: true })
    .isIn(['jpeg', 'jpg', 'png', 'gif', 'webp', 'tiff', 'avif', null])
    .withMessage('Invalid image format'),

  // resize
  body('resize').optional({ nullable: true }).isObject().withMessage('resize must be an object'),

  body('resize.width').optional().isInt({ min: 1 }).withMessage('width must be a positive integer'),

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
  body('border').optional({ nullable: true }).isObject().withMessage('border must be an object'),

  body('border.topWidth').optional().isInt({ min: 0 }),
  body('border.bottomWidth').optional().isInt({ min: 0 }),
  body('border.leftWidth').optional().isInt({ min: 0 }),
  body('border.rightWidth').optional().isInt({ min: 0 }),
  body('border.color')
    .optional()
    .isString()
    .matches(/^#([0-9A-F]{3}){1,2}$/i),

  // filters
  body('filters').optional({ nullable: true }).isObject().withMessage('filters must be an object'),

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
];
