import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CampusAmenity } from '@/modules/campus/entities';

@Injectable()
export class CampusService {
  constructor(
    @InjectRepository(CampusAmenity)
    private readonly campusAmenityRepository: Repository<CampusAmenity>,
  ) {}

  public async getAll(): Promise<CampusAmenity[]> {
    return this.campusAmenityRepository.find();
  }

  public async findById(id: number): Promise<CampusAmenity> {
    const campusAmenity = await this.campusAmenityRepository.findOne({
      where: { id: id },
    });
    return campusAmenity;
  }
}
