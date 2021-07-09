import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostRepository } from 'src/post/entity/post.repository';
import { UserRepository } from '../shared/entity/user/user.repository';
import { ApplicantController } from './applicant.controller';
import { ApplicantService } from './applicant.service';
import { ApplicantRepository } from './entity/applicant.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ApplicantRepository,
      UserRepository,
      PostRepository,
    ]),
  ],
  controllers: [ApplicantController],
  providers: [ApplicantService],
})
export class ApplicantModule {}
