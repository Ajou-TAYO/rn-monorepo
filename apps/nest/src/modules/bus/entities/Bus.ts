import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'bus' })
export class Bus {
  @PrimaryGeneratedColumn({ unsigned: true, name: 'bus_id' })
  id!: number;
}
