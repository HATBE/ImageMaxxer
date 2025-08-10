import { injectable } from 'inversify';
import { AppDataSource } from '../lib/AppDataSource';
import { Image } from '../models/entities/Image';

@injectable()
export default class ImageRepository {
  private repository = AppDataSource.getRepository(Image);

  public async create(id: string, userId: string | null, extension: string): Promise<Image> {
    const creationDate = Math.floor(Date.now() / 1000);

    const image = this.repository.create({
      id,
      userId,
      extension,
      creationDate,
    });

    return await this.repository.save(image);
  }

  public async deleteById(id: string): Promise<void> {
    await this.repository.delete(id);
  }

  public async getById(id: string): Promise<Image | null> {
    return await this.repository.findOne({ where: { id } });
  }

  public async getAllByUserId(userId: string): Promise<Image[] | null> {
    // TODO: pagination
    return await this.repository.find({ where: { userId } });
  }
}
