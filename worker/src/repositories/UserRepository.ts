import { AppDataSource } from '../lib/AppDataSource';
import User from '../models/entities/user/User';
import { v4 as uuidv4 } from 'uuid';

export default class UserRepository {
  private repository = AppDataSource.getRepository(User);

  public async create(username: string, passwordHash: string): Promise<User> {
    const creationDate = Math.floor(Date.now() / 1000);
    const id = uuidv4();

    const user = this.repository.create({
      id,
      username,
      passwordHash,
      creationDate,
    });

    return await this.repository.save(user);
  }

  public async deleteById(id: string): Promise<void> {
    await this.repository.delete(id);
  }

  //public async patchById(): Promise<User | null> {}

  public async getAll(): Promise<User[] | null> {
    // TODO: pagination
    return await this.repository.find();
  }

  public async getById(id: string): Promise<User | null> {
    return await this.repository.findOne({ where: { id } });
  }
}
