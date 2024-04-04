import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { BooksService } from 'src/books/books.service';
import { UsersService } from 'src/users/users.service';
import { CreateLoanDto } from './dto/create-loan.dto';
import { ReturnLoanDto } from './dto/return-loan.dto';
import { LoanPopulatedDocument, LoanStatuses } from './entities/loan.entity';
import { LoansRepository } from './loans.repository';

@Injectable()
export class LoansService {
  constructor(
    private readonly loansRepository: LoansRepository,
    private readonly booksService: BooksService,
    private readonly usersService: UsersService,
  ) {}
  async borrow(createLoanDto: CreateLoanDto) {
    const book = await this.booksService.findOne(createLoanDto.bookId);

    if (!book) throw new NotFoundException('Book not found!');

    const user = await this.usersService.findOne(createLoanDto.userId);

    if (!user) throw new NotFoundException('User not found!');

    const activeLoanOnBook = await this.getActiveLoanOnBook(
      createLoanDto.bookId,
    );

    if (activeLoanOnBook)
      throw new BadRequestException('The book is already borrowed!');

    return this.loansRepository.create({
      ...createLoanDto,
      status: LoanStatuses.ACTIVE,
    });
  }

  async return(returnLoanDto: ReturnLoanDto) {
    const loan = await this.loansRepository.findOne({
      userId: returnLoanDto.userId,
      bookId: returnLoanDto.bookId,
      status: LoanStatuses.ACTIVE,
    });

    if (!loan) throw new NotFoundException('Loan not found!');

    if (loan.status === LoanStatuses.RETURNED)
      throw new BadRequestException('The book is already returned!');

    await this.loansRepository.updateStatusForReturned(
      loan._id.toHexString(),
      returnLoanDto.score,
    );

    const [avgScoreAgregation] = await this.getAverageScore(
      returnLoanDto.bookId,
    );

    await this.booksService.updateScore(
      returnLoanDto.bookId,
      avgScoreAgregation.avgScore,
    );
  }

  findAll() {
    return this.loansRepository.find({});
  }

  findOne(id: string) {
    return this.loansRepository.findOne({ _id: id });
  }

  getActiveLoanOnBook(bookId: string) {
    return this.loansRepository.findOne({
      bookId,
      status: LoanStatuses.ACTIVE,
    });
  }

  getAverageScore(bookId: string) {
    return this.loansRepository.getAverageScore(bookId);
  }

  async getLoansHistory(userId: string) {
    const user = await this.usersService.findOne(userId);

    if (!user) throw new NotFoundException('User not found!');

    const loans = await this.loansRepository.getLoansHistory(userId);

    return {
      id: userId,
      name: user.name,
      books: this.formatLoansBooks(loans),
    };
  }

  formatLoansBooks(loans: LoanPopulatedDocument[]) {
    return {
      past: loans
        .filter((loan) => loan.status === LoanStatuses.RETURNED)
        .map(({ book, score }) => {
          return { name: book.name, score };
        }),
      present: loans
        .filter((loan) => loan.status === LoanStatuses.ACTIVE)
        .map(({ book, score }) => {
          return { name: book.name, score };
        }),
    };
  }
}
