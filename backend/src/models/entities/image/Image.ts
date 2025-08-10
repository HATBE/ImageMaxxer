import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import User from '../user/User';

@Entity({ name: 'images' })
export class Image {
  @PrimaryColumn('varchar', { length: 36, name: 'Iid' })
  id: string;

  @Column('varchar', { length: 36, name: 'Uid', nullable: true })
  userId: string | null = null;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'Uid' })
  user: User | null;

  @Column('varchar', { length: 10, name: 'Iextension' })
  extension: string;

  @Column('int', { name: 'IcreationDate' })
  creationDate: number;
}
