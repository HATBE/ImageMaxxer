import { Column, Entity, Index, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import ImageProcessingState from './ImageProcessingStates';
import { Image } from './Image';

@Entity({ name: 'imageprocessing' })
export default class ImageProcessing {
  @PrimaryColumn('varchar', { length: 36, name: 'IPid' })
  id!: string;

  @Index()
  @Column('varchar', { length: 36, name: 'Iid' })
  imageId!: string;

  @ManyToOne(() => Image)
  @JoinColumn({ name: 'Iid' })
  image!: Image;

  @Index()
  @Column('varchar', { length: 255, name: 'IPSname' })
  stateName!: string;

  @ManyToOne(() => ImageProcessingState)
  @JoinColumn({ name: 'IPSname' })
  state!: ImageProcessingState;

  @Column('int', { name: 'IPstartedTimestamp' })
  startedTimestamp!: number;

  @Column('int', { name: 'IPendTimestamp', nullable: true })
  endTimestamp!: number | null;
}
