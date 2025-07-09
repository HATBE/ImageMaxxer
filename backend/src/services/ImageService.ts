import { inject, injectable } from 'inversify';
import ImageUploader from '../image/ImageUploader';

@injectable()
export default class ImageService {
  public constructor(@inject(ImageUploader) private imageUploader: ImageUploader) {}

  public async upload(file: Buffer): Promise<string> {
    return await this.imageUploader.upload(file);
  }
}
