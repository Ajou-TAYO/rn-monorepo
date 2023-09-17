import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Exclude } from 'class-transformer';

@Entity({ name: 'member' })
export class Member {
  @PrimaryGeneratedColumn({ unsigned: true, name: 'member_id' })
  id!: number;

  @Column({ unique: true, nullable: false, length: 20 })
  email: string;

  @Column({ unique: true, nullable: false, length: 18 })
  nickname: string;

  @Column({ nullable: false })
  @Exclude() // Optional if you want to exclude password from serialization
  password: string;

  @Column({ nullable: false })
  auth: string;
}
