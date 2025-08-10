import { Column, Entity, Index, PrimaryColumn } from 'typeorm';

@Entity({ name: 'users' })
export default class User {
  @PrimaryColumn('varchar', { length: 36, name: 'Uid' })
  id: string;

  @Index({ unique: true })
  @Column('varchar', { length: 32, name: 'Uusername' })
  username: string;

  @Column('varchar', { length: 255, name: 'Upassword' })
  passwordHash: string;

  @Column('int', { name: 'UcreationDate' })
  creationDate: number;
}
