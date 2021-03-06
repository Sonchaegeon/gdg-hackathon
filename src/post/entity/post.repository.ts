import { EntityRepository, Repository } from 'typeorm';
import { CreatePostDto, CreatePostResponseData } from '../dto/create-post.dto';
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
}
