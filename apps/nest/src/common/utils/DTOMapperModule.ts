import { Module } from '@nestjs/common';
import { DTOMapper } from '@/common/utils/DTOMapper';

@Module({
  providers: [DTOMapper],
  exports: [DTOMapper],
})
export class DTOMapperModule {}
