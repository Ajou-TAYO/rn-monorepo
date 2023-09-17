import { LocationType } from '@/common/utils';
import { Partnership } from '@/modules/partnership/entities';
export class PartnershipResponseDTO {
  partnershipId: number;
  category: LocationType;
  name: string;
  detail: string;
  image?: string;
  expired: string;
  lat: number;
  lng: number;

  constructor(entity: Partnership) {
    this.partnershipId = entity.id;
    this.name = entity.name;
    this.image = entity.image;
    this.category = entity.category;
    this.detail = entity.detail;
    this.expired = entity.expired;
    this.lat = entity.lat;
    this.lng = entity.lng;
  }
}
