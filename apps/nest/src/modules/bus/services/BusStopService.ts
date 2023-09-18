import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BusStop } from '@/modules/bus/entities';
import { Repository } from 'typeorm';

@Injectable()
export class BusStopService {
  constructor(
    @InjectRepository(BusStop)
    private readonly busStopRepository: Repository<BusStop>,
  ) {}

  public async getAll(): Promise<BusStop[]> {
    return this.busStopRepository.find();
  }

  public async findById(id: number): Promise<BusStop> {
    const busStop = await this.busStopRepository.findOne({
      where: { id: id },
    });
    return busStop;
  }
}
