import { Post } from '../../post/entity/post.entity';
import { User } from '../../shared/entity/user/user.entity';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';

@Entity('applicant')
export class Applicant {
  @PrimaryColumn()
  @ManyToOne(() => User, (user) => user.applicant)
  @JoinColumn({ name: 'user_id' })
  user_id: number;

  @PrimaryColumn()
  @ManyToOne(() => Post, (post) => post.applicant)
  @JoinColumn({ name: 'post_id' })
  post_id: number;

  @Column({ type: 'tinyint', default: 0 })
  is_accept: number;

  @Column({ length: 60 })
  room_secret: string;
}
