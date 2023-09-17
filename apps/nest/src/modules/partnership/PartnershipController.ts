import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { PartnershipService } from './PartnershipService';
@Controller('partnership')
export class PartnershipController {
  constructor(private readonly partnershipService: PartnershipService) {}
}
