import { ApiProperty } from '@nestjs/swagger';

export class CreateBusDto {
  @ApiProperty()
  licensePlate: string;

  @ApiProperty()
  model: string;

  @ApiProperty()
  capacity: number;
}
