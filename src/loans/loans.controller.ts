import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { ScoreDto } from './dto/score.dto';
import { LoansService } from './loans.service';

@ApiTags('Loans')
@Controller()
export class LoansController {
  constructor(private readonly loansService: LoansService) {}

  @Get('loans')
  findAll() {
    return this.loansService.findAll();
  }

  @Post('users/:userId/return/:bookId')
  return(
    @Param('userId') userId: string,
    @Param('bookId') bookId: string,
    @Body() { score }: ScoreDto,
  ) {
    return this.loansService.return({ userId, bookId, score });
  }

  @ApiOperation({ summary: 'Get user by id' })
  @Get('users/:id')
  getLoansHistory(@Param('id') userId: string) {
    return this.loansService.getLoansHistory(userId);
  }

  @ApiOperation({ summary: 'Borrow book' })
  @Post('users/:userId/borrow/:bookId')
  borrow(@Param('userId') userId: string, @Param('bookId') bookId: string) {
    return this.loansService.borrow({ userId, bookId });
  }
}
