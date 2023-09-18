import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BusRoute } from '@/modules/bus/entities/BusRoute';

@Injectable()
export class BusRouteService {
  constructor(
    @InjectRepository(BusRoute)
    private readonly busRouteRepository: Repository<BusRoute>,
  ) {}

  public async getAll(): Promise<BusRoute[]> {
    return this.busRouteRepository.find();
  }

  public async findById(id: number): Promise<BusRoute> {
    const route = await this.busRouteRepository.findOne({
      where: { id: id },
    });
    return route;
  }
}
