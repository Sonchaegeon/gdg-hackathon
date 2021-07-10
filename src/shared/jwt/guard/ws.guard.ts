import {
  CanActivate,
  ExecutionContext,
  Injectable,
  Logger,
} from '@nestjs/common';
import { WsException } from '@nestjs/websockets';
import { Socket } from 'socket.io';
import { AuthService } from '../../../auth/auth.service';

@Injectable()
export class WsJwtGuard implements CanActivate {
  constructor(private authService: AuthService) {}
  private logger = new Logger('WsJwtGuard');
  async canActivate(context: ExecutionContext): Promise<boolean> {
    try {
      const client: Socket = context.switchToWs().getClient<Socket>();
      const token: string = client.handshake.query.token as string;
      const user = await this.authService.verifyUser(token);
      context.switchToHttp().getRequest().user = user;

      return Boolean(user);
    } catch (err) {
      this.logger.error(err.message);
      throw new WsException(err.message);
    }
  }
}
