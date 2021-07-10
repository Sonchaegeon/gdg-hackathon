import { Connection, ViewColumn, ViewEntity } from 'typeorm';
import { Post } from './post.entity';

@ViewEntity({
  name: 'post_view',
  expression: (connection: Connection) =>
    connection
      .createQueryBuilder(Post, 'post')
      .innerJoin('post.gift', 'gift')
      .innerJoin('post.user', 'post_user')
      .leftJoin('post.applicant', 'applicant')
      .leftJoin('applicant.user_id', 'user')
      .innerJoin('gift.shop', 'shop')
      .innerJoin('gift.gift_image', 'gift_image')
      .innerJoin('gift.genre', 'genre')
      .select('shop.name', 'shop_name')
      .addSelect('post.id', 'post_id')
      .addSelect('post_user.email', 'post_email')
      .addSelect('gift.name', 'gift_name')
      .addSelect('gift_image.cover_url', 'gift_image')
      .addSelect('gift.exp_date', 'exp_date')
      .addSelect('gift.price', 'price')
      .addSelect('genre.name', 'genre')
      .addSelect('applicant.is_accept', 'is_accept')
      .addSelect('applicant.room_secret', 'room_secret')
      .addSelect('user.email', 'user_email'),
})
export class PostView {
  @ViewColumn()
  shop_name: string;

  @ViewColumn()
  post_id: number;

  @ViewColumn()
  post_email: string;

  @ViewColumn()
  gift_name: string;

  @ViewColumn()
  gift_image: string;

  @ViewColumn()
  exp_date: Date;

  @ViewColumn()
  price: string;

  @ViewColumn()
  genre: string;

  @ViewColumn()
  is_accept: number;

  @ViewColumn()
  room_secret: string;

  @ViewColumn()
  user_email: string;
}
