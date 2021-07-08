import { Request } from 'express';

export interface IUserRequest extends Request {
  user: {
    email?: string;
    name?: string;
    profile_url?: string;
  };
}
