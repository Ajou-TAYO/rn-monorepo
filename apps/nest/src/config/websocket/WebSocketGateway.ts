import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'ws';

@WebSocketGateway()
export class MyWebSocketGateway {
  @WebSocketServer()
  server: Server;

}
