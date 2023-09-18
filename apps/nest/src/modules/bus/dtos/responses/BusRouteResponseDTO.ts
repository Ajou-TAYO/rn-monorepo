import { BusRoute, BusStop } from '@/modules/bus/entities';
import { BusStopResponseDTO } from '@/modules/bus/dtos/responses/BusStopResponseDTO';
import { BusRouteType } from '@/common/utils';

export class BusRouteResponseDTO {
  busRouteId: number;
  type: BusRouteType;
  departmentTimeList: string;
  depBusStop?: BusStopResponseDTO;
  midBusStop?: BusStopResponseDTO;
  arrBusStop?: BusStopResponseDTO;

  constructor(entity: BusRoute) {
    this.busRouteId = entity.id;
    this.type = entity.type; // enum으로 형변환
    this.departmentTimeList = entity.departmentTimeList;
    this.arrBusStop = entity.arrBusStop
      ? new BusStopResponseDTO(entity.arrBusStop)
      : undefined;
    this.midBusStop = entity.midBusStop
      ? new BusStopResponseDTO(entity.midBusStop)
      : undefined;
    this.depBusStop = entity.depBusStop
      ? new BusStopResponseDTO(entity.depBusStop)
      : undefined;
  }
}
