import { IsDateString, IsNumber } from 'class-validator';
import { Post } from '../entity/post.entity';

export class CreatePostDto {
  @IsDateString()
  exp_date: Date;

  @IsNumber()
  price: number;

  @IsNumber()
  gift_id: number;
}

export class CreatePostResponseData {
  exp_date: Date;
  price: number;
  user: number;
  gift: number;
  id: number;
}
