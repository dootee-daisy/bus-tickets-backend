import { Injectable } from '@nestjs/common';
import { CreateBookingDto } from './dto/create-booking.dto';
import { UpdateBookingDto } from './dto/update-booking.dto';
import { Booking } from './entities/booking.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class BookingsService {
  constructor(
    @InjectRepository(Booking)
    private readonly bookingRepository: Repository<Booking>,
  ) {}

  create(createBookingDto: CreateBookingDto) : Promise<Booking> {
    const booking = new Booking();
    booking.bookingDate = createBookingDto.bookingDate;
    booking.status = createBookingDto.status;
    return this.bookingRepository.save(booking);
  }

  findAll() : Promise<Booking[]> {
    return this.bookingRepository.find();
  }

  findOne(id: number) : Promise<Booking> {
    return this.bookingRepository.findOneBy({ id });
  }

  async update(id: number, updateBookingDto: UpdateBookingDto) : Promise<Booking> {
    const booking = await this.findOne(id);
    if (!booking) {
      throw new Error('Booking not found');
    }
    Object.assign(booking, updateBookingDto);
    return this.bookingRepository.save(booking);
  }

  async remove(id: number) : Promise<void> {
    const booking = await this.findOne(id);
    if (!booking) {
      throw new Error('Booking not found');
    }
    await this.bookingRepository.remove(booking);
  }
}
