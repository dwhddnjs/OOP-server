import { User } from 'src/user/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Pack {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  label: string;

  @Column()
  img: string;

  @Column()
  description: string;

  @Column()
  price: string;

  @ManyToOne((type) => User, (user) => user.packs, { eager: false })
  user: User;
}
