import { LocationType } from '@/common/utils';
import { CampusAmenity } from '@/modules/campus/entities';

export class CampusAmenityResponseDTO {
  amenityId: number;
  category: LocationType;
  name: string;
  detail: string;
  image?: string;
  lat: number;
  lng: number;

  constructor(entity: CampusAmenity) {
    this.amenityId = entity.id;
    this.name = entity.name;
    this.image = entity.image;
    this.category = entity.category;
    this.detail = entity.detail;
    this.lat = entity.lat;
    this.lng = entity.lng;
  }
}
