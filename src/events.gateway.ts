import { Logger, UseGuards } from '@nestjs/common';
import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  WsResponse,
} from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';
import { WsJwtGuard } from './shared/jwt/guard/ws.guard';

@WebSocketGateway()
export class EventsGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() server: Server;
  private logger: Logger = new Logger('EventsGateway');
  private msgLogger: Logger = new Logger('MsgLogger');

  @UseGuards(WsJwtGuard)
  @SubscribeMessage('msgToServer')
  handleMessage(client: Socket, msg: string): WsResponse<string> {
    this.msgLogger.log(`${client.id}: ${msg}`);
    return { event: 'msgToClient', data: msg };
  }

  handleConnection(client: Socket, ...args: any[]): void {
    this.logger.log(`Client connected ${client.id}`);
  }

  handleDisconnect(client: Socket): void {
    this.logger.log(`Client disconnected ${client.id}`);
  }
}
