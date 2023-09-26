/* eslint-disable prettier/prettier */
import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BusNotice } from '@/modules/bus/entities';
import { Repository } from 'typeorm';
import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Cron } from '@nestjs/schedule';
import { RedisService } from '@liaoliaots/nestjs-redis';
@Injectable()
@WebSocketGateway()
export class BusService {
  private readonly logger = new Logger(BusService.name);

  constructor(private readonly redisService: RedisService) {}

  // 일정한 주기로 실행되도록 Cron 설정
  @Cron('*/10 * * * * *') // 10초마다 실행
  public async handleCron(): Promise<any[]> {
    // Redis 클라이언트 인스턴스
    const redisClient = this.redisService.getClient();
    const keys = (await redisClient.keys('*')).filter((key) =>
      key.startsWith('bus'),
    );

    // 각 키에 해당하는 값을 가져와 배열에 저장합니다.
    const data = await Promise.all(
      keys.map(async (key) => {
        const value = await redisClient.get(key);

        this.logger.log(`Sent bus location for ${key}, pos: ${value}`);
        return { key, value };
      }),
    );

    return data;
  }
}
