import { Controller } from '@nestjs/common';
import { NoticeService } from '@/modules/notice/NoticeService';

@Controller('notices')
export class NoticeController {
  constructor(private readonly noticesService: NoticeService) {}
}
