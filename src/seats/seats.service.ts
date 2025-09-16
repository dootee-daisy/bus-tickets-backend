import { Injectable } from '@nestjs/common';
import { CreateSeatDto } from './dto/create-seat.dto';
import { UpdateSeatDto } from './dto/update-seat.dto';
import { Seat } from './entities/seat.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class SeatsService {
  constructor(
    @InjectRepository(Seat)
    private readonly seatRepository: Repository<Seat>,
  ) {}

  create(createSeatDto: CreateSeatDto) : Promise<Seat> {
    const seat = new Seat();
    seat.seatNumber = createSeatDto.seatNumber;
    seat.isAvailable = createSeatDto.isAvailable;
    return this.seatRepository.save(seat);
  }

  findAll() : Promise<Seat[]> {
    return this.seatRepository.find();
  }

  findOne(id: number) : Promise<Seat> {
    return this.seatRepository.findOneBy({ id });
  }

  async update(id: number, updateSeatDto: UpdateSeatDto) : Promise<Seat> {
    const seat = await this.findOne(id);
    if (!seat) {
      throw new Error('Seat not found');
    }
    Object.assign(seat, updateSeatDto);
    return this.seatRepository.save(seat);
  }

  async remove(id: number) : Promise<void> {
    const seat = await this.findOne(id);
    if (!seat) {
      throw new Error('Seat not found');
    }
    await this.seatRepository.remove(seat);
  }
}
