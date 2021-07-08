import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GiftRepository } from '../shared/entity/gift/gift.repository';
import { UserRepository } from '../shared/entity/user/user.repository';
import { PostRepository } from './entity/post.repository';
import { PostController } from './post.controller';
import { PostService } from './post.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([PostRepository, UserRepository, GiftRepository]),
  ],
  controllers: [PostController],
  providers: [PostService],
})
export class PostModule {}
