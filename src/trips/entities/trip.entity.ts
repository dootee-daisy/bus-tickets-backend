import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import { Route } from '../../routes/entities/route.entity';
import { Bus } from '../../buses/entities/bus.entity';
import { Booking } from '../../bookings/entities/booking.entity';

@Entity('trips')
export class Trip {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @ManyToOne(() => Route, route => route.trips)
  @JoinColumn({ name: 'route_id' })
  route: Route;

  @ManyToOne(() => Bus, bus => bus.trips)
  @JoinColumn({ name: 'bus_id' })
  bus: Bus;

  @Column({ name: 'departure_time', type: 'datetime' })
  departureTime: Date;

  @Column({ name: 'arrival_time', type: 'datetime' })
  arrivalTime: Date;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  price: number;

  @OneToMany(() => Booking, booking => booking.trip)
  bookings: Booking[];
}