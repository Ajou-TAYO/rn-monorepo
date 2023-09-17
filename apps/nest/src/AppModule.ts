import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MembersModule } from '@/modules/member/MembersModule';
import { DatabaseConfigModule, DatabaseConfigService } from '@/config/database';
import { BusModule } from '@/modules/bus/BusModule';
import { CampusModule } from '@/modules/campus/CampusModule';
import { NoticeModule } from '@/modules/notice/NoticeModule';
import { AuthModule } from '@/modules/auth/AuthModule';
import { PartnershipModule } from '@/modules/partnership/PartnershipModule';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [DatabaseConfigModule],
      useClass: DatabaseConfigService,
      inject: [DatabaseConfigService],
    }),
    MembersModule,
    AuthModule,
    BusModule,
    CampusModule,
    NoticeModule,
    PartnershipModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
