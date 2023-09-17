import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'bus_stop' })
export class BusStop {
  @PrimaryGeneratedColumn({ unsigned: true, name: 'bus_stop_id' })
  id!: number;

  @Column({ unique: true, nullable: false, length: 15 })
  name: string;

  @Column({ type: 'decimal', precision: 18, scale: 14, nullable: false })
  lat: number;

  @Column({ type: 'decimal', precision: 18, scale: 14, nullable: false })
  lng: number;
}
