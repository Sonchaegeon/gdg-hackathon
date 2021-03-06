import { Inject, Injectable, Scope } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { InjectRepository } from '@nestjs/typeorm';
import { IUserRequest } from '../shared/interface/request.interface';
import { User } from '../shared/entity/user/user.entity';
import { UserRepository } from '../shared/entity/user/user.repository';
import { Applicant } from './entity/applicant.entity';
import { ApplicantRepository } from './entity/applicant.repository';
import {
  AlreadyAcceptException,
  ApplicantForbiddenException,
  ApplicantNotFoundException,
  PostNotFoundException,
  UserNotFoundException,
} from '../shared/exception/exception.index';
import { v4 } from 'uuid';
import { Post } from '../post/entity/post.entity';
import { PostRepository } from '../post/entity/post.repository';
import { GetApplicantResponseData } from './dto/get-applicant.dto';
import { PostView } from 'src/post/entity/post-view.entity';
import { PostViewRepository } from 'src/post/entity/post-view.repository';

@Injectable({ scope: Scope.REQUEST })
export class ApplicantService {
  constructor(
    @InjectRepository(Applicant)
    private readonly applicantRepository: ApplicantRepository,
    @InjectRepository(User) private readonly userRepository: UserRepository,
    @InjectRepository(Post) private readonly postRepository: PostRepository,
    @InjectRepository(PostView)
    private readonly postViewRepository: PostViewRepository,
    @Inject(REQUEST) private readonly req: IUserRequest,
  ) {}

  public async createApplicant(post_id: number): Promise<Applicant> {
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

  public async getApplicants(): Promise<GetApplicantResponseData[]> {
    const applicantRecords = await this.postViewRepository.getApplicants(
      this.req.user.email,
    );
    if (applicantRecords.length === 0) throw ApplicantNotFoundException;
    return applicantRecords;
  }

  public async getPostApplicants(): Promise<GetApplicantResponseData[]> {
    const applicantRecords = await this.postViewRepository.getPostApplicants(
      this.req.user.email,
    );
    if (applicantRecords.length === 0) throw ApplicantNotFoundException;
    return applicantRecords;
  }

  public async deleteApplicant(post_id: number, email: string): Promise<void> {
    const applicantRecord = await this.applicantRepository.findOne({ post_id });
    if (!applicantRecord) throw ApplicantNotFoundException;

    const userRecord = await this.userRepository.findUserByEmail(
      this.req.user.email,
    );
    const applicantUserRecord = await this.userRepository.findUserByEmail(
      email,
    );
    if (!userRecord || !applicantUserRecord) throw UserNotFoundException;

    const postRecord = await this.postRepository.findOne({
      id: post_id,
      user: userRecord.id,
    });
    if (!postRecord) throw PostNotFoundException;

    await this.applicantRepository.delete({
      post_id: post_id,
      user_id: applicantUserRecord.id,
    });
  }

  public async acceptApplicant(post_id: number, email: string): Promise<void> {
    const userRecord = await this.userRepository.findUserByEmail(
      this.req.user.email,
    );
    const applicantUserRecord = await this.userRepository.findUserByEmail(
      email,
    );
    if (!userRecord || !applicantUserRecord) throw UserNotFoundException;

    const postRecord = await this.postRepository.findOne({
      id: post_id,
      user: userRecord.id,
    });
    if (!postRecord) throw PostNotFoundException;

    const applicantRecord = await this.applicantRepository.findOne({
      post_id,
      user_id: applicantUserRecord.id,
    });
    if (!applicantRecord) throw ApplicantNotFoundException;
    if (applicantRecord.is_accept === 1) throw AlreadyAcceptException;

    await this.applicantRepository.update(applicantRecord, { is_accept: 1 });
  }
}
