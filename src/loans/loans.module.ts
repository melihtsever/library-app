import { Module } from '@nestjs/common';
import { BooksModule } from 'src/books/books.module';
import { DatabaseModule } from 'src/libs/database';
import { UsersModule } from 'src/users/users.module';
import { Loan, LoanSchema } from './entities/loan.entity';
import { LoansController } from './loans.controller';
import { LoansRepository } from './loans.repository';
import { LoansService } from './loans.service';

@Module({
  imports: [
    DatabaseModule,
    DatabaseModule.forFeature([{ name: Loan.name, schema: LoanSchema }]),
    UsersModule,
    BooksModule,
  ],
  controllers: [LoansController],
  providers: [LoansService, LoansRepository],
})
export class LoansModule {}
