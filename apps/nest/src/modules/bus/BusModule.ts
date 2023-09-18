import { Module } from '@nestjs/common';
import { BusService } from './services/BusService';
import { BusController } from './BusController';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BusNotice, BusRoute, BusStop } from '@/modules/bus/entities';
import { RedisModule } from '@liaoliaots/nestjs-redis';
import { ScheduleModule } from '@nestjs/schedule';
import { WebSocketModule } from '@/config/websocket/WebSocketModule';
import { MyWebSocketGateway } from '@/config/websocket/WebSocketGateway';
import {
  BusNoticeService,
  BusRouteService,
  BusStopService,
} from '@/modules/bus/services';
import { DTOMapperModule } from "@/common/utils";

@Module({
  imports: [
    RedisModule,
    TypeOrmModule.forFeature([BusNotice, BusStop, BusRoute]),
    ScheduleModule.forRoot(),
    WebSocketModule,
    DTOMapperModule,
  ],
  controllers: [BusController],
  providers: [
    BusService,
    BusNoticeService,
    BusStopService,
    BusRouteService,
    MyWebSocketGateway,
  ],
  exports: [
    BusService,
    BusNoticeService,
    BusStopService,
    BusRouteService,
    TypeOrmModule,
  ],
})
export class BusModule {}
