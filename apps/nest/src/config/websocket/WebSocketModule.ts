import { Module } from '@nestjs/common';
import { MyWebSocketGateway } from '@/config/websocket/WebSocketGateway';

@Module({
  providers: [MyWebSocketGateway],
})
export class WebSocketModule {}
