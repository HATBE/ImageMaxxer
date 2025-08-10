import { injectable } from 'inversify';
import { AppDataSource } from '../lib/AppDataSource';
import ImageProcessing from '../models/entities/imageProcessing/ImageProcessing';
import { v4 as uuidv4 } from 'uuid';
import { ImageProcessingState } from '../models/ImageProcessingState';

@injectable()
export default class ImageProcessingRepository {
  private repository = AppDataSource.getRepository(ImageProcessing);

  public async create(imageId: string): Promise<ImageProcessing> {
    const startedTimestamp = Math.floor(Date.now() / 1000);
    const id = uuidv4();
    const state = ImageProcessingState.Pending;

    const imageProcessing = this.repository.create({
      id,
      imageId,
      state,
      startedTimestamp,
    });

    return await this.repository.save(imageProcessing);
  }

  // SHOULD NEVER BE CALLED, BECAUSE WE DONT DELETE THINGS HERE
  public async deleteById(id: string): Promise<void> {
    await this.repository.delete(id);
  }

  public async getById(id: string): Promise<ImageProcessing | null> {
    return await this.repository.findOne({ where: { id } });
  }

  public async getAllByImageId(imageId: string): Promise<ImageProcessing[] | null> {
    // TODO: pagination
    return await this.repository.find({ where: { imageId } });
  }

  public async changeState(
    id: string,
    state: ImageProcessingState
  ): Promise<ImageProcessing | null> {
    await this.repository.update(id, { state });
    return this.repository.findOne({ where: { id } });
  }
}
