import { Module } from '@nestjs/common';
import { EventsGateway } from './events/events.gateway';
import { AuthModule } from './auth/auth.module';
import { TypeOrmConfigModule } from './typeorm/typeorm-config.module';
import { JwtModule } from '@nestjs/jwt';
import { APP_FILTER } from '@nestjs/core';
import { HttpErrorFilter } from './shared/exception/exception.filter';
import { PostModule } from './post/post.module';
import { JwtStrategy } from './shared/jwt/strategy/jwt.strategy';
import { ApplicantModule } from './applicant/applicant.module';
import { EventsModule } from './events/events.module';

@Module({
  imports: [
    TypeOrmConfigModule,
    AuthModule,
    JwtModule.register({}),
    PostModule,
    ApplicantModule,
    EventsModule,
  ],
  providers: [
    JwtStrategy,
    {
      provide: APP_FILTER,
      useClass: HttpErrorFilter,
    },
  ],
})
export class AppModule {}
