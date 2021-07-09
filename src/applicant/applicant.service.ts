import { Inject, Injectable, Scope } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { InjectRepository } from '@nestjs/typeorm';
import { IUserRequest } from '../shared/interface/request.interface';
import { User } from '../shared/entity/user/user.entity';
import { UserRepository } from '../shared/entity/user/user.repository';
import { Applicant } from './entity/applicant.entity';
import { ApplicantRepository } from './entity/applicant.repository';
import {
  ApplicantForbiddenException,
  UserNotFoundException,
} from '../shared/exception/exception.index';
import { v4 } from 'uuid';
import { Post } from '../post/entity/post.entity';
import { PostRepository } from '../post/entity/post.repository';

@Injectable({ scope: Scope.REQUEST })
export class ApplicantService {
  constructor(
    @InjectRepository(Applicant)
    private readonly applicantRepository: ApplicantRepository,
    @InjectRepository(User) private readonly userRepository: UserRepository,
    @InjectRepository(Post) private readonly postRepository: PostRepository,
    @Inject(REQUEST) private readonly req: IUserRequest,
  ) {}

  public async createApplicant(post_id: number): Promise<Applicant> {
    console.log(this.req.user);
    const userRecord = await this.userRepository.findUserByEmail(
      this.req.user.email,
    );
    const postRecord = await this.postRepository.findOne(post_id);
    if (!userRecord) throw UserNotFoundException;
    if (userRecord.id === postRecord.id) throw ApplicantForbiddenException;
    return await this.applicantRepository.createApplicant(
      userRecord.id,
      post_id,
      v4(),
    );
  }
}
