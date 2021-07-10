import {
  CanActivate,
  ExecutionContext,
  Injectable,
  Logger,
} from '@nestjs/common';
import { WsException } from '@nestjs/websockets';
import { SocketType } from 'src/events/interface/socket-type.interface';
import { AuthService } from '../../../auth/auth.service';

@Injectable()
export class WsJwtGuard implements CanActivate {
  constructor(private authService: AuthService) {}
  private logger = new Logger('WsJwtGuard');
  async canActivate(context: ExecutionContext): Promise<boolean> {
    try {
      const client: SocketType = context.switchToWs().getClient<SocketType>();
      const token: string = client.handshake.query.token as string;
      const user = await this.authService.verifyUser(token);

      client.email = user.email;

      context.switchToHttp().getRequest().user = user;
      return Boolean(user);
    } catch (err) {
      this.logger.error(err.message);
      throw new WsException(err.message);
    }
  }
}
