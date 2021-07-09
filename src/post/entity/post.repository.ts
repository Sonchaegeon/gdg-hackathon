import { EntityRepository, Repository } from 'typeorm';
import { CreatePostDto, CreatePostResponseData } from '../dto/create-post.dto';
import { GetPostsResponseData } from '../dto/get-posts.dto';
import { Post } from './post.entity';

@EntityRepository(Post)
export class PostRepository extends Repository<Post> {
  public async createPost(
    dto: CreatePostDto,
    user: number,
  ): Promise<CreatePostResponseData> {
    let newPost: Post;
    newPost = this.create({
      gift: dto.gift_id,
      user,
    });
    return await this.save(newPost);
  }

  public async findPostByGiftId(gift: number): Promise<Post> {
    return await this.findOne({ gift });
  }

  public getPosts(page: number, size: number): Promise<GetPostsResponseData[]> {
    return this.createQueryBuilder('post')
      .innerJoin('post.gift', 'gift')
      .innerJoin('gift.shop', 'shop')
      .innerJoin('gift.gift_image', 'gift_image')
      .innerJoin('gift.genre', 'genre')
      .select('shop.name', 'shop_name')
      .addSelect('post.id', 'post_id')
      .addSelect('gift.name', 'gift_name')
      .addSelect('gift_image.cover_url', 'gift_image')
      .addSelect('gift.exp_date', 'exp_date')
      .addSelect('gift.price', 'price')
      .addSelect('genre.name', 'genre')
      .limit(page * size)
      .offset((page - 1) * size)
      .getRawMany();
  }
}
