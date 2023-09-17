import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BusNotice } from '@/modules/bus/entities';
import { Repository } from 'typeorm';

@Injectable()
export class BusService {
  constructor(
    @InjectRepository(BusNotice)
    private readonly busNoticeRepository: Repository<BusNotice>,
  ) {}
  public async getAll(): Promise<BusNotice[]> {
    return this.busNoticeRepository.find();
  }
}
