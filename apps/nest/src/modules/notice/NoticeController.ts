import { Controller, Get, NotFoundException, Param, Res } from '@nestjs/common';
import { NoticeService } from '@/modules/notice/NoticeService';

@Controller('notices')
export class NoticeController {
  constructor(private readonly noticeService: NoticeService) {}

  @Get(':id')
  async getNotice(@Param('id') id: number) {
    const notice = await this.noticeService.getNotice(id);
    return { notice };
  }

  @Get()
  async getAllNotices() {
    const notices = await this.noticeService.getAll();
    if (!notices) {
      throw new NotFoundException('Notices not found');
    }
  }
}
