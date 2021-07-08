import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CreatePostDto, CreatePostResponseData } from './dto/create-post.dto';
import { PostService } from './post.service';

@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @UseGuards(AuthGuard('jwt'))
  @Post()
  public async createPost(
    @Body() dto: CreatePostDto,
  ): Promise<CreatePostResponseData> {
    return await this.postService.createPost(dto);
  }
}
