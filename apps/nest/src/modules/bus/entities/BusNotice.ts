import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'bus_notice' })
export class BusNotice {
  @PrimaryGeneratedColumn({ unsigned: true, name: 'bus_notice_id' })
  id!: number;

  @Column({ nullable: false })
  title: string;

  @Column({ nullable: false })
  url: string;
}
