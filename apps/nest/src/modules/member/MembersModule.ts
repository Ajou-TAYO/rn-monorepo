import { Module } from '@nestjs/common';
import { MembersService } from './MembersService';
import { MembersController } from './MembersController';

@Module({
  controllers: [MembersController],
  providers: [MembersService],
})
export class MembersModule {}
