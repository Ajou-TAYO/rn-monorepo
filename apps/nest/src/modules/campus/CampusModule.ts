import { Module } from '@nestjs/common';
import { CampusService } from './CampusService';
import { CampusController } from './CampusController';

@Module({
  controllers: [CampusController],
  providers: [CampusService],
})
export class CampusModule {}
