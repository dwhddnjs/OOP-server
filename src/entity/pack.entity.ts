import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './user.entity';

@Entity()
export class Pack {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  label: string;

  @Column()
  price: number;

  @ManyToOne(() => User, (user) => user.packs)
  user: User;

  @CreateDateColumn()
  createdAt: Date;
}
