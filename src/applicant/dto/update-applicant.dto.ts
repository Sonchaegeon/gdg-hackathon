import { IsEmail, IsString } from 'class-validator';

export class UpdateApplicantDto {
  @IsString()
  @IsEmail()
  user_email: string;
}
