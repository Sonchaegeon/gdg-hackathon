import { User } from '../../shared/entity/user/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Gift } from 'src/shared/entity/gift/gift.entity';

@Entity('post')
export class Post {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.post)
  @JoinColumn({ name: 'user_id' })
  user: number;

  @OneToOne(() => Gift, (gift) => gift.post)
  @JoinColumn({ name: 'gift_id' })
  gift: number;
}
