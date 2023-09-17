import { BusNotice } from '@/modules/bus/entities';

export class BusNoticeResponseDTO {
  busNoticeId: number;
  title: string;
  url: string;

  constructor(entity: BusNotice) {
    this.busNoticeId = entity.id;
    this.title = entity.title;
    this.url = entity.url;
  }
}
