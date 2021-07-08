import {
  BadRequestException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';

// 400
export const ExistUserException = new BadRequestException('Exist User Error');
export const ExistPostException = new BadRequestException('Exist Post Error');

// 401
export const UnauthorizedTokenException = new UnauthorizedException();
export const ExpiredTokenException = new UnauthorizedException('Token Expired');

// 404
export const UserNotFoundException = new NotFoundException('User Not Found');
export const GiftNotFoundException = new NotFoundException('Gift Not Found');
