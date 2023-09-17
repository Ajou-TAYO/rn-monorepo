import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { LocationType } from '@/common';

@Entity({ name: 'partnerships' })
export class Partnership {
  @PrimaryGeneratedColumn({ unsigned: true, name: 'partnership_id' })
  id!: number;

  @Column({ nullable: false })
  name: string;

  @Column({ type: 'enum', enum: LocationType })
  category: LocationType;

  @Column({ nullable: true })
  image: string;

  @Column()
  expired: string;

  @Column({ nullable: false })
  detail: string;

  @Column('decimal', { precision: 18, scale: 14, nullable: false })
  lat: number;

  @Column('decimal', { precision: 18, scale: 14, nullable: false })
  lng: number;
}
