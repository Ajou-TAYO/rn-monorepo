import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  NotFoundException,
} from '@nestjs/common';
import { CampusService } from './CampusService';
import { CampusAmenityResponseDTO } from '@/modules/campus/dtos/responses/CampusAmenityResponseDTO';
import { BusStopResponseDTO } from '@/modules/bus/dtos/responses/BusStopResponseDTO';
import { DTOMapper } from '@/common/utils';

@Controller('campus')
export class CampusController {
  constructor(
    private readonly campusService: CampusService,
    private readonly dtoMapper: DTOMapper, // DtoMapper를 주입받습니다.
  ) {}

  @Get(':id')
  async getCampusAmenity(@Param('id') id: string) {
    const campusAmenity = await this.campusService.findById(+id);
    if (!campusAmenity) {
      throw new NotFoundException('CampusAmenity not found');
    }
    return new CampusAmenityResponseDTO(campusAmenity);
  }

  @Get()
  async getAllCampusAmenities() {
    const campusAmenities = await this.campusService.getAll();
    if (!campusAmenities) {
      throw new NotFoundException('CampusAmenities not found');
    }
    return this.dtoMapper.mapToDTOList(
      campusAmenities,
      CampusAmenityResponseDTO,
    );
  }
}
