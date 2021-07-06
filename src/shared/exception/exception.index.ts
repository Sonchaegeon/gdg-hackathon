import { BadRequestException, UnauthorizedException } from '@nestjs/common';

// 400
export const ExistUserException = new BadRequestException('Exist User Error');

// 401
export const UnauthorizedTokenException = new UnauthorizedException();
export const ExpiredTokenException = new UnauthorizedException('Token Expired');
