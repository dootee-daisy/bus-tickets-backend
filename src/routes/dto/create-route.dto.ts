import { ApiProperty } from '@nestjs/swagger';

export class CreateRouteDto {
  @ApiProperty()
  origin: string;

  @ApiProperty()
  destination: string;

  @ApiProperty()
  distance: number;
}