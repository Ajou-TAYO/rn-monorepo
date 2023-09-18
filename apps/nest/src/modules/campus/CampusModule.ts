import { Module } from '@nestjs/common';
import { CampusService } from './CampusService';
import { CampusController } from './CampusController';
import { DTOMapperModule } from '@/common/utils';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CampusAmenity } from '@/modules/campus/entities';

@Module({
  imports: [DTOMapperModule, TypeOrmModule.forFeature([CampusAmenity])],
  controllers: [CampusController],
  providers: [CampusService],
  exports: [TypeOrmModule, CampusService],
})
export class CampusModule {}
