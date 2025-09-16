import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Trip } from '../../trips/entities/trip.entity';
import { Seat } from '../../seats/entities/seat.entity';

@Entity('buses')
export class Bus {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column({ unique: true })
  licensePlate: string;

  @Column()
  model: string;

  @Column()
  capacity: number;

  @OneToMany(() => Trip, trip => trip.bus)
  trips: Trip[];

  @OneToMany(() => Seat, seat => seat.bus)
  seats: Seat[];
}