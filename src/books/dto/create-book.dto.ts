import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateBookDto {
  @ApiProperty({
    description: 'Book name',
    example: 'A painted house',
  })
  @IsString()
  @IsNotEmpty()
  name: string;
}
