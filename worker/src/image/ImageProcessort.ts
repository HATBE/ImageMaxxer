import sharp, { Sharp } from 'sharp';
import ImageEditOptions from '../model/ImageEditOptions';

export default class ImageProcessor {
  private sharp: Sharp;
  private options: ImageEditOptions;

  public constructor(fileBuffer: Buffer, options: ImageEditOptions) {
    this.options = options;
    this.sharp = sharp(fileBuffer);
  }

  public async build(autoRotateOnExif: boolean = true): Promise<Buffer> {
    if (autoRotateOnExif) {
      this.sharp.rotate(); // Auto-rotate based on EXIF
    }

    this.convertToFormat();
    this.applyFilters();
    this.rotate();
    this.flip();
    this.resize();
    this.applyBorder();
    this.compress();

    return await this.sharp.toBuffer();
  }

  private resize(): void {
    if (!this.options.resize) {
      return;
    }

    if (this.options.resize.width <= 0 || this.options.resize.height <= 0) {
      console.warn(
        `Invalid resize dimensions: ${this.options.resize.width}x${this.options.resize.height}. Skipping resize.`
      );
      return;
    }

    this.sharp.resize({
      width: this.options.resize.width,
      height: this.options.resize.height,
      fit: this.options.resize.fit,
      withoutEnlargement: !this.options.resize.upscale,
      background: this.options.fillColor ?? undefined,
    });
  }

  private applyFilters(): void {
    if (!this.options.filters) return;

    const { brightness, saturation, blur, grayscale, invert } = this.options.filters;

    if (brightness !== null || saturation !== null) {
      this.sharp.modulate({
        ...(brightness !== null && { brightness }),
        ...(saturation !== null && { saturation }),
      });
    }

    if (blur !== null) {
      this.sharp.blur(blur);
    }

    if (grayscale) {
      this.sharp.grayscale();
    }

    if (invert) {
      this.sharp.negate();
    }
  }

  private compress(): void {
    const quality = this.options.compressionQuality;

    if (quality !== null) {
      if (quality < 1 || quality > 100) {
        console.warn(`Compression quality ${quality} is out of range (1-100). Using default 75.`);
        this.options.compressionQuality = 75;
      }

      switch (this.options.format) {
        case 'jpeg':
        case 'jpg':
          this.sharp.jpeg({ quality });
          break;
        case 'png':
          this.sharp.png({ quality });
          break;
        case 'webp':
          this.sharp.webp({ quality });
          break;
        case 'avif':
          this.sharp.avif({ quality });
          break;
        default:
          console.warn(`No compression supported for format: ${this.options.format}`);
          break;
      }
    }
  }

  private applyBorder(): void {
    if (this.options.border) {
      this.sharp.extend({
        top: this.options.border.topWidth,
        bottom: this.options.border.bottomWidth,
        left: this.options.border.leftWidth,
        right: this.options.border.rightWidth,
        background: this.options.border.color,
      });
    }
  }

  private flip(): void {
    if (this.options.flipHorizontal) {
      this.sharp.flip();
    }
    if (this.options.flipVertical) {
      this.sharp.flop();
    }
  }

  private rotate(): void {
    if (this.options.rotate) {
      this.sharp.rotate(this.options.rotate);
    }
  }

  private convertToFormat(): void {
    const supportedFormats = ['jpeg', 'jpg', 'png', 'webp', 'tiff', 'avif', 'gif'];

    if (this.options.format && supportedFormats.includes(this.options.format)) {
      this.sharp.toFormat(this.options.format);
    } else if (this.options.format) {
      console.warn(`Unsupported format requested: ${this.options.format}`);
    }
  }
}
