import { Injectable } from '@nestjs/common';

@Injectable()
export class DTOMapper {
  mapToDTOList<T, D>(entities: T[], dtoClass: new (entity: T) => D): D[] {
    return entities.map((entity) => new dtoClass(entity));
  }
}
