import { Expose, Type } from 'class-transformer';
import { AbstractDto } from '../../AbstractDto';
import ImageDto from '../image/ImageDto';
import { Image } from '../image/Image';
import { ImageProcessingState } from '../../ImageProcessingState';

export default class ImageProcessingDto extends AbstractDto {
  @Expose()
  id: number;

  @Expose()
  @Type(() => ImageDto)
  image: Image;

  @Expose()
  state: ImageProcessingState;

  @Expose()
  startedTimestamp: number;

  @Expose()
  endTimestamp: number | null;
}
