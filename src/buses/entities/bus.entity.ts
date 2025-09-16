import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Trip } from '../../trips/entities/trip.entity';
import { Seat } from '../../seats/entities/seat.entity';

@Entity('buses')
export class Bus {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column({ name: 'plate_number', length: 20, unique: true })
  plateNumber: string;

  @Column({
    name: 'bus_type',
    type: 'enum',
    enum: ['limousine', 'sleeper', 'seater'],
  })
  busType: string;

  @Column({ name: 'total_seats', type: 'int' })
  totalSeats: number;

  @OneToMany(() => Trip, trip => trip.bus)
  trips: Trip[];

  @OneToMany(() => Seat, seat => seat.bus)
  seats: Seat[];
}