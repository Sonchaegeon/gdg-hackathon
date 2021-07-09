import { Inject, Injectable, Scope } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from '../shared/entity/user/user.repository';
import { User } from '../shared/entity/user/user.entity';
import { REQUEST } from '@nestjs/core';
import { IUserRequest } from '../shared/interface/request.interface';
import { GoogleLoginResponseData } from './dto/google-login.dto';
import * as jwt from 'jsonwebtoken';
import { JWT_SECRET_KEY } from '../shared/jwt/jwt.constant';
import { WsException } from '@nestjs/websockets';

@Injectable({ scope: Scope.REQUEST })
export class AuthService {
  constructor(
    @InjectRepository(User) private readonly userRepository: UserRepository,
    @Inject(REQUEST) private readonly req: IUserRequest,
  ) {}

  public async googleLogin(): Promise<GoogleLoginResponseData> {
    const userRecord = await this.userRepository.findUserByEmail(
      this.req.user.email,
    );
    if (!userRecord) await this.userRepository.createUser(this.req);

    const access_token = this.generateToken(this.req.user.email, 'access');
    const refresh_token = this.generateToken(this.req.user.email, 'refresh');

    return { access_token, refresh_token };
  }

  public async verifyUser(token: string): Promise<User> {
    const decoded = jwt.verify(token, JWT_SECRET_KEY) as { email: string };
    const userRecord = this.userRepository.findUserByEmail(decoded.email);
    if (!userRecord) throw new WsException('User Not Found!!');
    return userRecord;
  }

  private generateToken(email: string, type: string): string {
    return jwt.sign({ email, type }, JWT_SECRET_KEY, {
      expiresIn: type === 'access' ? '2h' : type === 'refresh' ? '14d' : 0,
    });
  }
}
