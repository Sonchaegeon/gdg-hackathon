import { Module } from '@nestjs/common';
import { EventsGateway } from './events.gateway';
import { AuthModule } from './auth/auth.module';
import { TypeOrmConfigModule } from './typeorm/typeorm-config.module';
import { JwtModule } from '@nestjs/jwt';
import { APP_FILTER } from '@nestjs/core';
import { HttpErrorFilter } from './shared/exception/exception.filter';

@Module({
  imports: [TypeOrmConfigModule, AuthModule, JwtModule.register({})],
  providers: [
    EventsGateway,
    {
      provide: APP_FILTER,
      useClass: HttpErrorFilter,
    },
  ],
})
export class AppModule {}
