import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Gift } from '../gift/gift.entity';

@Entity('genre')
export class Genre {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 45 })
  name: string;

  @OneToOne(() => Gift, (gift) => gift.genre)
  gift: number;
}
