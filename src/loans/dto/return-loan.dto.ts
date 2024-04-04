import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString, Max, Min } from 'class-validator';
import { ScoreDto } from './score.dto';

export class ReturnLoanDto extends ScoreDto {
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

  @ApiProperty({
    description: 'score',
    example: '8',
  })
  @Max(10)
  @Min(0)
  @IsNumber()
  @IsNotEmpty()
  score: number;
}
