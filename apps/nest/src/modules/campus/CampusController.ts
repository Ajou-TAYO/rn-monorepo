import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CampusService } from './CampusService';

@Controller('campus')
export class CampusController {
  constructor(private readonly campusService: CampusService) {}
}
