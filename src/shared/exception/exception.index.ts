import {
  BadRequestException,
  ForbiddenException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';

// 400
export const ExistUserException = new BadRequestException('Exist User Error');
export const ExistPostException = new BadRequestException('Exist Post Error');
export const QueryInputException = new BadRequestException('Query Input Error');

// 401
export const UnauthorizedTokenException = new UnauthorizedException();
export const ExpiredTokenException = new UnauthorizedException('Token Expired');

// 403
export const ApplicantForbiddenException = new ForbiddenException(
  'You cannot applicant to your post',
);

// 404
export const UserNotFoundException = new NotFoundException('User Not Found');
export const GiftNotFoundException = new NotFoundException('Gift Not Found');
export const ApplicantNotFoundException = new NotFoundException(
  'Applicant Not Found',
);
