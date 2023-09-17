import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { LocationType } from '@/common';

@Entity({ name: 'campus_amenity' })
export class CampusAmenity {
  @PrimaryGeneratedColumn({ unsigned: true, name: 'amenity_id' })
  id!: number;

  @Column({ nullable: false })
  name: string;

  @Column({ type: 'enum', enum: LocationType })
  category: LocationType;

  @Column({ nullable: true })
  image: string;

  @Column({ nullable: true })
  detail: string;

  @Column({ type: 'decimal', precision: 18, scale: 14, nullable: false })
  lat: number;

  @Column({ type: 'decimal', precision: 18, scale: 14, nullable: false })
  lng: number;
}
