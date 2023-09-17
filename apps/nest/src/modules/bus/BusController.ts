import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { BusService } from './BusService';

@Controller('bus')
export class BusController {
  constructor(private readonly busService: BusService) {}

  @Get('/')
  async getAll() {
    const result = await this.busService.getAll();

    return { result };
  }
}
