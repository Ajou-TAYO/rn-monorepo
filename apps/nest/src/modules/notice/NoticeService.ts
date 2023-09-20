import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Notice } from '@/modules/notice/entitiies';
import { Repository } from 'typeorm';

@Injectable()
export class NoticeService {
  constructor(
    @InjectRepository(Notice)
    private readonly noticeRepository: Repository<Notice>,
  ) {}

  async getNotice(id: number) {
    try {
      // Replace with your actual query to get a notice by ID
      const notice = this.noticeRepository.findOne({
        where: { id: id },
      });

      if (!notice) {
        throw new Error('Notice not found');
      }

      return notice;
    } catch (error) {
      throw new Error('Error fetching notice by ID');
    }
  }

  async getAll(): Promise<Notice[]> {
    return this.noticeRepository.find();
  }
}
