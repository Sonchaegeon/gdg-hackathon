import { Request } from 'express';

export interface IUserRequest extends Request {
  user: {
    sub: number;
    email?: string;
    name?: string;
    profile_url?: string;
  };
}
