import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsString } from 'class-validator';

export class CreateBookingDto {
  @ApiProperty()
  @IsDate()
  bookingDate: Date;

  @ApiProperty()
  @IsString()
  status: string;
}
