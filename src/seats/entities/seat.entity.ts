import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { Bus } from '../../buses/entities/bus.entity';
import { Booking } from '../../bookings/entities/booking.entity';

@Entity('seats')
export class Seat {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @ManyToOne(() => Bus, bus => bus.seats)
  @JoinColumn({ name: 'bus_id' })
  bus: Bus;

  @Column({ name: 'seat_number', length: 10 })
  seatNumber: string;

  @Column()
  isAvailable: boolean;

  @OneToMany(() => Booking, booking => booking.seat)
  bookings: Booking[];
}