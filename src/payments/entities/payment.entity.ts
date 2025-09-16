import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Booking } from '../../bookings/entities/booking.entity';

@Entity('payments')
export class Payment {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @ManyToOne(() => Booking, booking => booking.payments)
  @JoinColumn({ name: 'booking_id' })
  booking: Booking;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  amount: number;

  @Column({
    type: 'enum',
    enum: ['vnpay', 'momo', 'cash', 'stripe'],
  })
  method: string;

  @Column({
    type: 'enum',
    enum: ['pending', 'paid', 'failed'],
  })
  status: string;

  @Column({ name: 'paid_at', type: 'datetime', nullable: true })
  paidAt: Date;
}