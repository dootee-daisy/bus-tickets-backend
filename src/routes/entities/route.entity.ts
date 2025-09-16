import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Trip } from '../../trips/entities/trip.entity';

@Entity('routes')
export class Route {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column()
  origin: string;

  @Column()
  destination: string;

  @Column()
  distance: number;

  @OneToMany(() => Trip, trip => trip.route)
  trips: Trip[];
}