import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MembersModule } from '@/modules/member/MembersModule';
import { DatabaseConfigModule, DatabaseConfigService } from '@/config/database';
import { BusModule } from '@/modules/bus/BusModule';
import { CampusModule } from '@/modules/campus/CampusModule';
import { NoticeModule } from '@/modules/notice/NoticeModule';
import { AuthModule } from '@/modules/auth/AuthModule';
import { PartnershipModule } from '@/modules/partnership/PartnershipModule';
import { RedisModule } from '@liaoliaots/nestjs-redis';
import { RedisConfigService } from '@/config/redis';
import { WebSocketModule } from '@/config/websocket/WebSocketModule';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [DatabaseConfigModule],
      useClass: DatabaseConfigService,
      inject: [DatabaseConfigService],
    }),
    RedisModule.forRootAsync({
      imports: [ConfigModule],
      useClass: RedisConfigService,
      inject: [ConfigService],
    }),
    MembersModule,
    AuthModule,
    BusModule,
    CampusModule,
    NoticeModule,
    PartnershipModule,
    WebSocketModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
