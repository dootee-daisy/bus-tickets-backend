import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Trip } from '../../trips/entities/trip.entity';

@Entity('routes')
export class Route {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column({ name: 'start_location', length: 100 })
  startLocation: string;

  @Column({ name: 'end_location', length: 100 })
  endLocation: string;

  @Column({ name: 'distance_km', type: 'int', nullable: true })
  distanceKm: number;

  @OneToMany(() => Trip, trip => trip.route)
  trips: Trip[];
}