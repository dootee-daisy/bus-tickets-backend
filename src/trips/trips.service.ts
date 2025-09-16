import { Injectable } from '@nestjs/common';
import { CreateTripDto } from './dto/create-trip.dto';
import { UpdateTripDto } from './dto/update-trip.dto';
import { Trip } from './entities/trip.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class TripsService {
  constructor(
    @InjectRepository(Trip)
    private readonly tripRepository: Repository<Trip>,
  ) {}

  create(createTripDto: CreateTripDto) : Promise<Trip> {
    const trip = new Trip();
    trip.departureTime = createTripDto.departureTime;
    trip.arrivalTime = createTripDto.arrivalTime;
    trip.origin = createTripDto.origin;
    trip.destination = createTripDto.destination;
    trip.price = createTripDto.price;
    return this.tripRepository.save(trip);
  }

  findAll() : Promise<Trip[]> {
    return this.tripRepository.find();
  }

  findOne(id: number) : Promise<Trip> {
    return this.tripRepository.findOneBy({ id });
  }

  async update(id: number, updateTripDto: UpdateTripDto) : Promise<Trip> {
    const trip = await this.findOne(id);
    if (!trip) {
      throw new Error('Trip not found');
    }
    Object.assign(trip, updateTripDto);
    return this.tripRepository.save(trip);
  }

  async remove(id: number) : Promise<void> {
    const trip = await this.findOne(id);
    if (!trip) {
      throw new Error('Trip not found');
    }
    await this.tripRepository.remove(trip);
  }
}
