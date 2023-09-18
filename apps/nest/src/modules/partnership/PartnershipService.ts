import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Partnership } from '@/modules/partnership/entities';

@Injectable()
export class PartnershipService {
  constructor(
    @InjectRepository(Partnership)
    private readonly partnershipRepository: Repository<Partnership>,
  ) {}

  public async getAll(): Promise<Partnership[]> {
    return this.partnershipRepository.find();
  }

  public async findById(id: number): Promise<Partnership> {
    const partnership = await this.partnershipRepository.findOne({
      where: { id: id },
    });
    return partnership;
  }
}
