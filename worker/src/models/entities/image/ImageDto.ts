import { Expose, Type } from 'class-transformer';
import { AbstractDto } from '../../AbstractDto';
import User from '../user/User';
import UserDto from '../user/UserDto';

export default class ImageDto extends AbstractDto {
  @Expose()
  id: number;

  @Expose()
  @Type(() => UserDto)
  user: User;

  @Expose()
  extension: string;

  @Expose()
  creationDate: number;
}
