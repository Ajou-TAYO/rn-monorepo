import {
  Controller,
  Get,
  InternalServerErrorException,
  NotFoundException,
  Param,
} from '@nestjs/common';
import { PartnershipService } from './PartnershipService';
import { DTOMapper } from '@/common/utils';
import { PartnershipResponseDTO } from '@/modules/partnership/dtos';
@Controller('partnerships')
export class PartnershipController {
  constructor(
    private readonly dtoMapper: DTOMapper,
    private readonly partnershipService: PartnershipService,
  ) {}

  @Get(':id')
  async getPartnership(@Param('id') id: string) {
    const partnership = await this.partnershipService.findById(+id);
    if (!partnership) {
      throw new NotFoundException('Partnership not found');
    }
    return new PartnershipResponseDTO(partnership);
  }

  @Get()
  async getAllPartnerships() {
    const partnerships = await this.partnershipService.getAll();
    if (!partnerships) {
      throw new NotFoundException('Partnerships not found');
    }
    return this.dtoMapper.mapToDTOList(partnerships, PartnershipResponseDTO);
  }
}
