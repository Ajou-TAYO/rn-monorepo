import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { BusStop } from '@/modules/bus/entities/BusStop';
import { BusRouteType, LocationType } from '@/common/utils';

@Entity('bus_route')
export class BusRoute {
  @PrimaryGeneratedColumn({ unsigned: true, name: 'bus_route_id' })
  id: number;

  @Column({ type: 'enum', enum: BusRouteType })
  type: BusRouteType;

  @Column({ nullable: false, length: 15 })
  name: string;

  @Column({ nullable: false })
  departmentTimeList: string;

  @OneToOne(() => BusStop, { cascade: true, eager: true }) // cascade 및 eager 옵션은 필요에 따라 조정하세요.
  @JoinColumn({ name: 'dep_bus_stop_id' })
  depBusStop: BusStop;

  @OneToOne(() => BusStop, { cascade: true, eager: true })
  @JoinColumn({ name: 'mid_bus_stop_id' })
  midBusStop: BusStop;

  @OneToOne(() => BusStop, { cascade: true, eager: true })
  @JoinColumn({ name: 'arr_bus_stop_id' })
  arrBusStop: BusStop;
}
