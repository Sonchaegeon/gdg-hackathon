import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { TokenExpiredError } from 'jsonwebtoken';
import {
  ExpiredTokenException,
  UnauthorizedTokenException,
} from 'src/shared/exception/exception.index';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  handleRequest(err, user, info: Error) {
    if (info instanceof TokenExpiredError) {
      throw ExpiredTokenException;
    } else if (err) {
      throw UnauthorizedTokenException;
    }
    return user;
  }
}
