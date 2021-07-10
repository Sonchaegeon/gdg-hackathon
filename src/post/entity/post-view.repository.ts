import { GetApplicantResponseData } from 'src/applicant/dto/get-applicant.dto';
import { EntityRepository, Repository } from 'typeorm';
import { GetPostsResponseData } from '../dto/get-posts.dto';
import { PostView } from './post-view.entity';

@EntityRepository(PostView)
export class PostViewRepository extends Repository<PostView> {
  public getPosts(page: number, size: number): Promise<GetPostsResponseData[]> {
    return this.createQueryBuilder('view')
      .select('view.shop_name', 'shop_name')
      .addSelect('view.post_id', 'post_id')
      .addSelect('view.gift_name', 'gift_name')
      .addSelect('view.gift_image', 'gift_image')
      .addSelect('view.exp_date', 'exp_date')
      .addSelect('view.price', 'price')
      .addSelect('view.genre', 'genre')
      .limit(page * size)
      .offset((page - 1) * size)
      .getRawMany();
  }

  public getApplicants(email: string): Promise<GetApplicantResponseData[]> {
    return this.createQueryBuilder('view')
      .select('view.shop_name', 'shop_name')
      .addSelect('view.post_id', 'post_id')
      .addSelect('view.gift_name', 'gift_name')
      .addSelect('view.gift_image', 'gift_image')
      .addSelect('view.exp_date', 'exp_date')
      .addSelect('view.price', 'price')
      .addSelect('view.genre', 'genre')
      .addSelect('view.is_accept', 'is_accept')
      .addSelect('view.room_secret', 'room_secret')
      .addSelect('view.post_email', 'post_email')
      .addSelect('view.user_email', 'user_email')
      .where('view.user_email = :email', { email })
      .getRawMany();
  }
}
