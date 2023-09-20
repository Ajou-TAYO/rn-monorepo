import { Notice } from '@/modules/notice/entitiies';
import { Type } from 'class-transformer';
import { IsDate } from 'class-validator';

export class NoticeResponseDTO {
  noticeId: number;
  title: string;
  content: string;
  nickname: string;

  @Type(() => Date)
  @IsDate()
  created_at: Date;

  @Type(() => Date)
  @IsDate()
  updated_at: Date;

  constructor(entity: Notice) {
    this.noticeId = entity.id;
    this.title = entity.title;
    this.content = entity.content;
    this.nickname = entity.nickname;
    this.created_at = entity.created_at;
    this.updated_at = entity.updated_at;
  }
}
