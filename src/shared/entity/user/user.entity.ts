import { Post } from '../../../post/entity/post.entity';
import { Gift } from '../../../shared/entity/gift/gift.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('user')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100, unique: true })
  email: string;

  @Column({ length: 150 })
  profile_url: string;

  @Column({ length: 30 })
  name: string;

  @OneToMany(() => Gift, (gift) => gift.user)
  gift: Gift[];

  @OneToMany(() => Post, (post) => post.user)
  post: Post[];
}
