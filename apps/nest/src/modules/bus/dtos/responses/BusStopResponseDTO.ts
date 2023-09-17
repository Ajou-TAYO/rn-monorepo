import { BusStop } from '@/modules/bus/entities';

export class BusStopResponseDTO {
  locationId: number;
  name: string;
  lat: number;
  lng: number;

  constructor(entity: BusStop) {
    this.locationId = entity.id;
    this.lat = entity.lat;
    this.lng = entity.lng;
    this.name = entity.name;
  }
}
