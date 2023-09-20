import { Controller, Get, NotFoundException, Param, Res } from '@nestjs/common';
import { NoticeService } from '@/modules/notice/NoticeService';
import { NoticeResponseDTO } from '@/modules/notice/dtos';
import { DTOMapper } from '@/common/utils';

@Controller('notices')
export class NoticeController {
  constructor(
    private readonly dtoMapper: DTOMapper,
    private readonly noticeService: NoticeService,
  ) {}

  @Get(':id')
  async getNotice(@Param('id') id: number) {
    const notice = await this.noticeService.getNotice(id);
    if (!notice) {
      throw new NotFoundException('Notices not found');
    }
    return new NoticeResponseDTO(notice);
  }

  @Get()
  async getAllNotices() {
    const notices = await this.noticeService.getAll();
    if (!notices) {
      throw new NotFoundException('Notices not found');
    }
    return this.dtoMapper.mapToDTOList(notices, NoticeResponseDTO);
  }
}
