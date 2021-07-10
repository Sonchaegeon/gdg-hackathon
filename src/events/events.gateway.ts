import { Logger, UseGuards } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  WsException,
} from '@nestjs/websockets';
import { Server } from 'socket.io';
import { Applicant } from 'src/applicant/entity/applicant.entity';
import { ApplicantRepository } from 'src/applicant/entity/applicant.repository';
import { Gift } from 'src/shared/entity/gift/gift.entity';
import { GiftRepository } from 'src/shared/entity/gift/gift.repository';
import { User } from 'src/shared/entity/user/user.entity';
import { UserRepository } from 'src/shared/entity/user/user.repository';
import { WsJwtGuard } from '../shared/jwt/guard/ws.guard';
import { SocketType } from './interface/socket-type.interface';

@WebSocketGateway()
export class EventsGateway implements OnGatewayConnection, OnGatewayDisconnect {
  constructor(
    @InjectRepository(User) private readonly userRepository: UserRepository,
    @InjectRepository(Gift) private readonly giftRepository: GiftRepository,
    @InjectRepository(Applicant)
    private readonly applicantRepository: ApplicantRepository,
  ) {}

  @WebSocketServer() server: Server;
  private logger: Logger = new Logger('EventsGateway');
  private msgLogger: Logger = new Logger('MsgLogger');

  @SubscribeMessage('requestMoreGift')
  handleMessage(client: SocketType): void {
    this.msgLogger.log(`${client.email}: more gift`);
    client.broadcast.to(client.currentRoom).emit('requestMoreGift');
  }

  @SubscribeMessage('requestAccept')
  requestAccept(client: SocketType): void {
    this.msgLogger.log(`${client.email}: request Accept`);
    client.broadcast.to(client.currentRoom).emit('requestAccept');
  }

  @SubscribeMessage('accept')
  async accept(client: SocketType, user_id: number): Promise<void> {
    this.msgLogger.log(`${client.email}: accept`);
    await this.applicantRepository.delete({
      post_id: client.post_id,
      user_id,
    });
    this.server.sockets.in(client.currentRoom).emit('accept');
    client.leave(client.currentRoom);
  }

  @SubscribeMessage('leaveRoom')
  async leaveRoom(client: SocketType, user_id: number): Promise<void> {
    this.msgLogger.log(`${client.email}: leave room`);
    await this.applicantRepository.delete({
      post_id: client.post_id,
      user_id,
    });
    this.server.sockets.in(client.currentRoom).emit('leaveRoom');
    client.leave(client.currentRoom);
  }

  @SubscribeMessage('addGift')
  async addGift(client: SocketType, gift_id: number): Promise<void> {
    this.msgLogger.log(`${client.email}: add gift`);
    const user = await this.userRepository.findUserByEmail(client.email);
    if (!user) new WsException('User Not Found');
    const gift = await this.giftRepository.findOne({
      id: gift_id,
      user: user.id,
    });
    if (!gift) throw new WsException('Gift Not Found');
    else this.server.sockets.in(client.currentRoom).emit('addGift', gift);
  }

  @UseGuards(WsJwtGuard)
  @SubscribeMessage('joinRoomSeller')
  joinRoomSeller(client: SocketType, room: string, post_id: number): void {
    client.join(room);
    client.currentRoom = room;
    client.is_accept = 0;
    client.post_id = post_id;
    this.logger.log(`${client.email} seller joined room: ${room}`);
  }

  @UseGuards(WsJwtGuard)
  @SubscribeMessage('joinRoomBuyer')
  async joinRoomBuyer(client: SocketType, room: string): Promise<void> {
    const user = await this.userRepository.findUserByEmail(client.email);
    client.join(room);
    client.currentRoom = room;
    client.is_accept = 0;
    client.broadcast.to(room).emit('joinComplete', user);
    this.logger.log(`${client.email} buyer joined room: ${room}`);
  }

  handleConnection(client: SocketType, ...args: any[]): void {
    this.logger.log(`Client connected ${client.id}`);
  }

  handleDisconnect(client: SocketType): void {
    this.logger.log(`Client disconnected ${client.id}`);
  }
}
