import { ApiProperty } from '@nestjs/swagger';

export class CreateBookingDto {
  @ApiProperty()
  bookingDate: Date;

  @ApiProperty()
  status: string;
}
