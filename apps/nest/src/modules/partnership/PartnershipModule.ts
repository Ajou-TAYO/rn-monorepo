import { Module } from '@nestjs/common';
import { PartnershipService } from './PartnershipService';
import { PartnershipController } from './PartnershipController';

@Module({
  controllers: [PartnershipController],
  providers: [PartnershipService],
})
export class PartnershipModule {}
