import { Inject, Injectable, Scope } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { InjectRepository } from '@nestjs/typeorm';
import { Gift } from '../shared/entity/gift/gift.entity';
import { GiftRepository } from '../shared/entity/gift/gift.repository';
import { User } from '../shared/entity/user/user.entity';
import { UserRepository } from '../shared/entity/user/user.repository';
import {
  ExistPostException,
  GiftNotFoundException,
  QueryInputException,
  UserNotFoundException,
} from '../shared/exception/exception.index';
import { IUserRequest } from '../shared/interface/request.interface';
import { CreatePostDto, CreatePostResponseData } from './dto/create-post.dto';
import { GetPostsResponseData } from './dto/get-posts.dto';
import { Post } from './entity/post.entity';
import { PostRepository } from './entity/post.repository';

@Injectable({ scope: Scope.REQUEST })
export class PostService {
  constructor(
    @InjectRepository(Post) private readonly postRepository: PostRepository,
    @InjectRepository(User) private readonly userRepository: UserRepository,
    @InjectRepository(Gift) private readonly giftRepository: GiftRepository,
    @Inject(REQUEST) private readonly req: IUserRequest,
  ) {}

  public async createPost(dto: CreatePostDto): Promise<CreatePostResponseData> {
    const userRecord = await this.userRepository.findUserByEmail(
      this.req.user.email,
    );
    const giftRecord = await this.giftRepository.findOne(dto.gift_id);
    if (!userRecord) throw UserNotFoundException;
    if (!giftRecord) throw GiftNotFoundException;
    const postRecord = await this.postRepository.findOne({ gift: dto.gift_id });
    if (postRecord) throw ExistPostException;
    return await this.postRepository.createPost(dto, userRecord.id);
  }

  public async getPosts(
    page: number,
    size: number,
  ): Promise<GetPostsResponseData[]> {
    if (page <= 0 || size <= 0) throw QueryInputException;
    return this.postRepository.getPosts(page, size);
  }
}
