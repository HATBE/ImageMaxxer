import { body } from 'express-validator';

export const imageEditOptionsValidator = [
  // Main "options" object must exist
  body('options').isObject().withMessage('Options must be an object'),

  // format: allowed strings or null
  body('options.format')
    .optional({ nullable: true })
    .isIn(['jpeg', 'jpg', 'png', 'gif', 'webp', 'tiff', 'avif', null])
    .withMessage('Invalid format'),

  // resize: object or null
  body('options.resize')
    .optional({ nullable: true })
    .isObject()
    .withMessage('Resize must be an object'),

  body('options.resize.width')
    .optional({ nullable: true })
    .isInt({ min: 1, max: 10000 })
    .withMessage('Resize width must be between 1 and 10000'),

  body('options.resize.height')
    .optional({ nullable: true })
    .isInt({ min: 1, max: 10000 })
    .withMessage('Resize height must be between 1 and 10000'),

  body('options.resize.fit')
    .optional({ nullable: true })
    .isIn(['cover', 'contain', 'fill', 'inside', 'outside'])
    .withMessage('Invalid fit value'),

  body('options.resize.upscale')
    .optional({ nullable: true })
    .isBoolean()
    .withMessage('Upscale must be boolean'),

  // fillColor: hex string or null
  body('options.fillColor')
    .optional({ nullable: true })
    .matches(/^#([0-9A-Fa-f]{3}|[0-9A-Fa-f]{6})$/)
    .withMessage('Fill color must be a valid hex color'),

  // rotate: number 0–360 or null
  body('options.rotate')
    .optional({ nullable: true })
    .isInt({ min: 0, max: 360 })
    .withMessage('Rotate must be between 0 and 360'),

  // flipHorizontal, flipVertical: booleans
  body('options.flipHorizontal').isBoolean().withMessage('flipHorizontal must be boolean'),
  body('options.flipVertical').isBoolean().withMessage('flipVertical must be boolean'),

  // compressionQuality: 0–100 or null
  body('options.compressionQuality')
    .optional({ nullable: true })
    .isInt({ min: 0, max: 100 })
    .withMessage('Compression quality must be between 0 and 100'),

  // border: object or null
  body('options.border')
    .optional({ nullable: true })
    .isObject()
    .withMessage('Border must be an object'),

  body('options.border.topWidth')
    .optional({ nullable: true })
    .isInt({ min: 0, max: 500 })
    .withMessage('Border topWidth must be 0–500'),
  body('options.border.bottomWidth')
    .optional({ nullable: true })
    .isInt({ min: 0, max: 500 })
    .withMessage('Border bottomWidth must be 0–500'),
  body('options.border.leftWidth')
    .optional({ nullable: true })
    .isInt({ min: 0, max: 500 })
    .withMessage('Border leftWidth must be 0–500'),
  body('options.border.rightWidth')
    .optional({ nullable: true })
    .isInt({ min: 0, max: 500 })
    .withMessage('Border rightWidth must be 0–500'),

  body('options.border.color')
    .optional({ nullable: true })
    .matches(/^#([0-9A-Fa-f]{3}|[0-9A-Fa-f]{6})$/)
    .withMessage('Border color must be a valid hex color'),

  // filters: object or null
  body('options.filters')
    .optional({ nullable: true })
    .isObject()
    .withMessage('Filters must be an object'),

  body('options.filters.brightness')
    .optional({ nullable: true })
    .isFloat({ min: -1, max: 1 })
    .withMessage('Brightness must be between -1 and 1'),
  body('options.filters.saturation')
    .optional({ nullable: true })
    .isFloat({ min: -1, max: 1 })
    .withMessage('Saturation must be between -1 and 1'),
  body('options.filters.blur')
    .optional({ nullable: true })
    .isFloat({ min: 0, max: 100 })
    .withMessage('Blur must be between 0 and 100'),

  body('options.filters.grayscale')
    .optional({ nullable: true })
    .isBoolean()
    .withMessage('Grayscale must be boolean'),
  body('options.filters.invert')
    .optional({ nullable: true })
    .isBoolean()
    .withMessage('Invert must be boolean'),
];
