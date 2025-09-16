import { Injectable } from '@nestjs/common';
import { CreateBusDto } from './dto/create-bus.dto';
import { UpdateBusDto } from './dto/update-bus.dto';
import { Bus } from './entities/bus.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class BusesService {
  constructor(
    @InjectRepository(Bus)
    private readonly busRepository: Repository<Bus>,
  ) {}

  create(createBusDto: CreateBusDto) : Promise<Bus> {
    const bus = new Bus();
    bus.licensePlate = createBusDto.licensePlate;
    bus.model = createBusDto.model;
    bus.capacity = createBusDto.capacity;
    return this.busRepository.save(bus);
  }

  findAll() : Promise<Bus[]> {
    return this.busRepository.find();
  }

  findOne(id: number) : Promise<Bus> {
    return this.busRepository.findOneBy({ id });
  }

  async update(id: number, updateBusDto: UpdateBusDto) : Promise<Bus> {
    const bus = await this.findOne(id);
    if (!bus) {
      throw new Error('Bus not found');
    }
    Object.assign(bus, updateBusDto);
    return this.busRepository.save(bus);
  }

  async remove(id: number) : Promise<void> {
    const bus = await this.findOne(id);
    if (!bus) {
      throw new Error('Bus not found');
    }
    await this.busRepository.remove(bus);
  }
}
