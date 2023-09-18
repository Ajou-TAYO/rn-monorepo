import { Module } from '@nestjs/common';
import { NoticeController } from '@/modules/notice/NoticeController';
import { NoticeService } from '@/modules/notice/NoticeService';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Notice } from '@/modules/notice/entitiies';
import { DTOMapperModule } from '@/common/utils';

@Module({
  imports: [DTOMapperModule, TypeOrmModule.forFeature([Notice])],
  controllers: [NoticeController],
  providers: [NoticeService],
  exports: [TypeOrmModule, NoticeService],
})
export class NoticeModule {}
