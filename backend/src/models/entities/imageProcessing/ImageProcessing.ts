import { Column, Entity, Index, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { Image } from '../image/Image';
import { ImageProcessingState } from '../../ImageProcessingState';

@Entity({ name: 'imageprocessing' })
export default class ImageProcessing {
  @PrimaryColumn('varchar', { length: 36, name: 'IPid' })
  id: string;

  @Index()
  @Column('varchar', { length: 36, name: 'Iid' })
  imageId: string;

  @ManyToOne(() => Image)
  @JoinColumn({ name: 'Iid' })
  image: Image;

  @Index()
  @Column({
    type: 'enum',
    enum: ImageProcessingState,
    name: 'IPSname',
  })
  state: ImageProcessingState;

  @Column('int', { name: 'IPstartedTimestamp' })
  startedTimestamp: number;

  @Column('int', { name: 'IPendTimestamp', nullable: true })
  endTimestamp: number | null;
}
