import { Expose } from 'class-transformer';
import { AbstractDto } from '../../AbstractDto';

export default class UserDto extends AbstractDto {
  @Expose()
  id: number;

  @Expose()
  username: number;

  @Expose()
  creationDate: number;
}
