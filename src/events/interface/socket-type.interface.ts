import { Socket } from 'socket.io';

export interface SocketType extends Socket {
  email?: string;
  currentRoom?: string;
  is_accept?: number;
  post_id: number;
}
