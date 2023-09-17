import { Module } from '@nestjs/common';
import { NoticeController } from '@/modules/notice/NoticeController';
import { NoticeService } from '@/modules/notice/NoticeService';

@Module({
  controllers: [NoticeController],
  providers: [NoticeService],
})
export class NoticeModule {}
