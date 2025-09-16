import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateRouteDto } from './dto/create-route.dto';
import { UpdateRouteDto } from './dto/update-route.dto';
import { Route } from './entities/route.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class RoutesService {
  constructor(
    @InjectRepository(Route)
    private readonly routeRepository: Repository<Route>,
  ) {}

  create(createRouteDto: CreateRouteDto) : Promise<Route> {
    const route = this.routeRepository.create(createRouteDto);
    return this.routeRepository.save(route);
  }

  findAll() : Promise<Route[]> {
    return this.routeRepository.find();
  }

  async findOne(id: number) : Promise<Route> {
    const route = await this.routeRepository.findOneBy({ id });
    if (!route) {
      throw new NotFoundException(`Route with ID ${id} not found`);
    }
    return route;
  }

  async update(id: number, updateRouteDto: UpdateRouteDto) : Promise<Route> {
    const route = await this.routeRepository.preload({
      id: id,
      ...updateRouteDto,
    });
    if (!route) {
      throw new NotFoundException(`Route with ID ${id} not found`);
    }
    return this.routeRepository.save(route);
  }

  async remove(id: number) : Promise<void> {
    const result = await this.routeRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Route with ID ${id} not found`);
    }
  }
}
