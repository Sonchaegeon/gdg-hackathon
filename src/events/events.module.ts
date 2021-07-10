import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ApplicantRepository } from 'src/applicant/entity/applicant.repository';
import { AuthModule } from 'src/auth/auth.module';
import { PostRepository } from 'src/post/entity/post.repository';
import { GiftRepository } from 'src/shared/entity/gift/gift.repository';
import { UserRepository } from 'src/shared/entity/user/user.repository';
import { EventsGateway } from './events.gateway';

@Module({
  imports: [
    AuthModule,
    TypeOrmModule.forFeature([
      UserRepository,
      GiftRepository,
      PostRepository,
      ApplicantRepository,
    ]),
  ],
  providers: [EventsGateway],
})
export class EventsModule {}
