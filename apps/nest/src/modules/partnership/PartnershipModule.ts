import { Module } from '@nestjs/common';
import { PartnershipService } from './PartnershipService';
import { PartnershipController } from './PartnershipController';
import { DTOMapperModule } from '@/common/utils';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Partnership } from '@/modules/partnership/entities';

@Module({
  imports: [DTOMapperModule, TypeOrmModule.forFeature([Partnership])],
  controllers: [PartnershipController],
  providers: [PartnershipService],
  exports: [TypeOrmModule, PartnershipService],
})
export class PartnershipModule {}
