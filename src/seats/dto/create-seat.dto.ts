import { ApiProperty } from '@nestjs/swagger';

export class CreateSeatDto {
  @ApiProperty()
  seatNumber: string;

  @ApiProperty()
  isAvailable: boolean;
}