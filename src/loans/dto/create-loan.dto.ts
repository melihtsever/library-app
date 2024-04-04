import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateLoanDto {
  @ApiProperty({
    description: 'Book Id',
    example: '660e9b4304071cac93570826',
  })
  @IsString()
  @IsNotEmpty()
  bookId: string;

  @ApiProperty({
    description: 'User Id',
    example: '660e9ca504071cac93570829',
  })
  @IsString()
  @IsNotEmpty()
  userId: string;
}
