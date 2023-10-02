import { Member } from '@/modules/member/entities';

export class MemberResponseDTO {
  email: string;

  constructor(entity: Member) {
    this.email = entity.email;
  }
}
