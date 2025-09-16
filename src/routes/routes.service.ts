import { Injectable } from '@nestjs/common';
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
    const route = new Route();
    route.origin = createRouteDto.origin;
    route.destination = createRouteDto.destination;
    route.distance = createRouteDto.distance;
    return this.routeRepository.save(route);
  }

  findAll() : Promise<Route[]> {
    return this.routeRepository.find();
  }

  findOne(id: number) : Promise<Route> {
    return this.routeRepository.findOneBy({ id });
  }

  async update(id: number, updateRouteDto: UpdateRouteDto) : Promise<Route> {
    const route = await this.findOne(id);
    if (!route) {
      throw new Error('Route not found');
    }
    Object.assign(route, updateRouteDto);
    return this.routeRepository.save(route);
  }

  async remove(id: number) : Promise<void> {
    const route = await this.findOne(id);
    if (!route) {
      throw new Error('Route not found');
    }
    await this.routeRepository.remove(route);
  }
}
