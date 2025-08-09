import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity({ name: 'imageprocessingstate' })
export default class ImageProcessingState {
  @PrimaryColumn('varchar', { length: 255, name: 'IPSname' })
  name!: string;

  @Column({ type: 'boolean', name: 'IPSisDefault', default: false })
  isDefault!: boolean;
}
