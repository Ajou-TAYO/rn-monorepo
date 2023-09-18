import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BusNotice } from '@/modules/bus/entities';
import { Repository } from 'typeorm';

@Injectable()
export class BusNoticeService {
  constructor(
    @InjectRepository(BusNotice)
    private readonly busNoticeRepository: Repository<BusNotice>,
  ) {}

  public async getAll(): Promise<BusNotice[]> {
    return this.busNoticeRepository.find();
  }

  public async findById(id: number): Promise<BusNotice> {
    const notice = await this.busNoticeRepository.findOne({
      where: { id: id },
    });
    return notice;
  }
}
