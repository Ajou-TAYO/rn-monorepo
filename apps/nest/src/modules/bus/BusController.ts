import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';
import { BusService } from './services/BusService';
import { MyWebSocketGateway } from '@/config/websocket/WebSocketGateway';
import { BusNoticeService, BusRouteService } from '@/modules/bus/services';
import { BusStopService } from '@/modules/bus/services/BusStopService';
import {
  BusNoticeResponseDTO,
  BusRouteResponseDTO,
} from '@/modules/bus/dtos/responses';
import { DTOMapper } from '@/common/utils/DTOMapper';
import { BusStopResponseDTO } from '@/modules/bus/dtos/responses/BusStopResponseDTO';
@Controller('bus')
export class BusController {
  constructor(
    private readonly busService: BusService,
    private readonly busNoticeService: BusNoticeService,
    private readonly busStopService: BusStopService,
    private readonly busRouteService: BusRouteService,

    private readonly myWebSocketGateway: MyWebSocketGateway,
    private readonly dtoMapper: DTOMapper, // DtoMapper를 주입받습니다.
  ) {}

  @Get('/websocket')
  async getRedisData() {
    const data = await this.busService.handleCron();
    // WebSocket을 통해 데이터를 클라이언트에 보냅니다.
    this.myWebSocketGateway.server.emit('redisData', data);
  }

  @Get('/notices')
  async getAllNotice() {
    const notices = await this.busNoticeService.getAll();
    if (!notices) {
      throw new NotFoundException('BusNotices not found');
    }
    return this.dtoMapper.mapToDTOList(notices, BusNoticeResponseDTO);
  }

  @Get('/notices/:id')
  async findByNoticeId(@Param('id') id: number) {
    const notice = await this.busNoticeService.findById(id);
    if (!notice) {
      throw new NotFoundException('BusNotice not found');
    }
    return new BusNoticeResponseDTO(notice);
  }

  @Get('/stops')
  async getAllBusStop() {
    const busStops = await this.busStopService.getAll();
    if (!busStops) {
      throw new NotFoundException('BusStops not found');
    }
    return this.dtoMapper.mapToDTOList(busStops, BusStopResponseDTO);
  }

  @Get('/stops/:id')
  async findByBusStopId(@Param('id') id: number) {
    const busStop = await this.busStopService.findById(id);
    if (!busStop) {
      throw new NotFoundException('BusStop not found');
    }
    return new BusStopResponseDTO(busStop);
  }

  @Get('/routes')
  async getAllBusRoutes() {
    const routes = await this.busRouteService.getAll();
    if (!routes) {
      throw new NotFoundException('BusRoutes not found');
    }
    return this.dtoMapper.mapToDTOList(routes, BusRouteResponseDTO);
  }

  @Get('/routes/:id')
  async findByBusRoutesId(@Param('id') id: number) {
    const route = await this.busRouteService.findById(id);
    if (!route) {
      throw new NotFoundException('BusRoute not found');
    }
    return new BusRouteResponseDTO(route);
  }
}
