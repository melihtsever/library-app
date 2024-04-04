import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, Max, Min } from 'class-validator';

export class ScoreDto {
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
