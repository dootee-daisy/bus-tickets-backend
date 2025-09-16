import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { PaymentsModule } from './payments/payments.module';
import { BookingsModule } from './bookings/bookings.module';
import { SeatsModule } from './seats/seats.module';
import { TripsModule } from './trips/trips.module';
import { BusesModule } from './buses/buses.module';
import { RoutesModule } from './routes/routes.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: '103.82.24.7',
      port: 3306,
      username: 'mhirgrp_bus_tickets',
      password: 'mhirgrp_bus_tickets',
      database: 'mhirgrp_bus_tickets',
      entities: [],
      synchronize: true,
    }),
    UsersModule, 
    RoutesModule, 
    BusesModule, 
    TripsModule, 
    SeatsModule, 
    BookingsModule, 
    PaymentsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
