import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn, OneToMany } from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Trip } from '../../trips/entities/trip.entity';
import { Seat } from '../../seats/entities/seat.entity';
import { Payment } from '../../payments/entities/payment.entity';

@Entity('bookings')
export class Booking {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column({ type: 'datetime' })
  bookingDate: Date;

  @ManyToOne(() => User, user => user.bookings)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(() => Trip, trip => trip.bookings)
  @JoinColumn({ name: 'trip_id' })
  trip: Trip;

  @ManyToOne(() => Seat, seat => seat.bookings, { nullable: true })
  @JoinColumn({ name: 'seat_id' })
  seat: Seat;

  @Column({
    type: 'enum',
    enum: ['pending', 'confirmed', 'cancelled'],
  })
  status: string;

  @CreateDateColumn({ name: 'created_at', type: 'datetime' })
  createdAt: Date;

  @OneToMany(() => Payment, payment => payment.booking)
  payments: Payment[];
}