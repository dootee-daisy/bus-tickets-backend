import { Injectable, NotFoundException } from '@nestjs/common';
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
    const seat = this.seatRepository.create(createSeatDto);
    return this.seatRepository.save(seat);
  }

  findAll() : Promise<Seat[]> {
    return this.seatRepository.find();
  }

  async findOne(id: number) : Promise<Seat> {
    const seat = await this.seatRepository.findOneBy({ id });
    if (!seat) {
      throw new NotFoundException(`Seat with ID ${id} not found`);
    }
    return seat;
  }

  async update(id: number, updateSeatDto: UpdateSeatDto) : Promise<Seat> {
    const seat = await this.seatRepository.preload({
      id: id,
      ...updateSeatDto,
    });
    if (!seat) {
      throw new NotFoundException(`Seat with ID ${id} not found`);
    }
    return this.seatRepository.save(seat);
  }

  async remove(id: number) : Promise<void> {
    const result = await this.seatRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Seat with ID ${id} not found`);
    }
  }
}
