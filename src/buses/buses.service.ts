import { Injectable, NotFoundException } from '@nestjs/common';
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
    const bus = this.busRepository.create(createBusDto);
    return this.busRepository.save(bus);
  }

  findAll() : Promise<Bus[]> {
    return this.busRepository.find();
  }

  async findOne(id: number) : Promise<Bus> {
    const bus = await this.busRepository.findOneBy({ id });
    if (!bus) {
      throw new NotFoundException(`Bus with ID ${id} not found`);
    }
    return bus;
  }

  async update(id: number, updateBusDto: UpdateBusDto) : Promise<Bus> {
    const bus = await this.busRepository.preload({
      id: id,
      ...updateBusDto,
    });
    if (!bus) {
      throw new NotFoundException(`Bus with ID ${id} not found`);
    }
    return this.busRepository.save(bus);
  }

  async remove(id: number) : Promise<void> {
    const result = await this.busRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Bus with ID ${id} not found`);
    }
  }
}
