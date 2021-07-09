import { Post } from '../../../post/entity/post.entity';
import { Shop } from '../../../shared/entity/shop/shop.entity';
import { User } from '../../../shared/entity/user/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { GiftImage } from './gift-image.entity';
import { Genre } from '../genre/genre.entity';

@Entity('gift')
export class Gift {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 150 })
  name: string;

  @Column({ type: 'int' })
  price: number;

  @Column()
  exp_date: Date;

  @OneToOne(() => GiftImage, (giftImage) => giftImage.gift_id)
  gift_image: number;

  @ManyToOne(() => Shop, (shop) => shop.gift)
  @JoinColumn({ name: 'shop_id' })
  shop: number;

  @ManyToOne(() => User, (user) => user.gift)
  @JoinColumn({ name: 'user_id' })
  user: number;

  @OneToOne(() => Post, (post) => post.gift)
  post: Post;

  @OneToOne(() => Genre, (genre) => genre.gift)
  @JoinColumn({ name: 'genre_id' })
  genre: Genre;
}
