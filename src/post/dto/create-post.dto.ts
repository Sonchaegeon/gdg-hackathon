import { IsNumber } from 'class-validator';

export class CreatePostDto {
  @IsNumber()
  gift_id: number;
}

export class CreatePostResponseData {
  user: number;
  gift: number;
  id: number;
}
