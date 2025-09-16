import { ApiProperty } from '@nestjs/swagger';

export class CreateTripDto {
  @ApiProperty()
  departureTime: Date;

  @ApiProperty()
  arrivalTime: Date;

  @ApiProperty()
  origin: string;

  @ApiProperty()
  destination: string;

  @ApiProperty()
  price: number;
}