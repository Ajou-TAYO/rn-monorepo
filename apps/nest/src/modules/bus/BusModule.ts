import { Module } from '@nestjs/common';
import { BusService } from './BusService';
import { BusController } from './BusController';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BusNotice } from '@/modules/bus/entities';

@Module({
  imports: [TypeOrmModule.forFeature([BusNotice])],
  controllers: [BusController],
  providers: [BusService],
  exports: [BusService, TypeOrmModule],
})
export class BusModule {}
