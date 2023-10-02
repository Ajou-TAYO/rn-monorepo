import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Bus, BusNotice, BusRoute, BusStop } from '@/modules/bus/entities';
import { Member } from '@/modules/member/entities';
import { CampusAmenity } from '@/modules/campus/entities';
import { Partnership } from '@/modules/partnership/entities';
import { Notice } from '@/modules/notice/entitiies';

@Injectable()
export class DatabaseConfigService implements TypeOrmOptionsFactory {
  constructor(private readonly configService: ConfigService) {}

  getEntities() {
    return [
      Member,
      BusNotice,
      BusStop,
      BusRoute,
      Bus,
      CampusAmenity,
      Partnership,
      Notice,
    ];
  }

  createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
      type: 'mysql',
      username: this.configService.get<string>('DATABASE_USER'),
      password: this.configService.get<string>('DATABASE_PASSWORD'),
      port: +this.configService.get<number>('DATABASE_PORT'),
      host: this.configService.get<string>('DATABASE_HOST'),
      database: this.configService.get<string>('DATABASE_SCHEMA'),
      entities: this.getEntities(),
      namingStrategy: new SnakeNamingStrategy(),
      logging: this.configService.get<string>('NODE_ENV') !== 'production',
      migrationsRun: false,
      synchronize: true,
    };
  }
}
