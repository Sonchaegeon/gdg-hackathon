import { IsEmail, IsString } from 'class-validator';

export class DeleteApplicantDto {
  @IsString()
  @IsEmail()
  user_email: string;
}
