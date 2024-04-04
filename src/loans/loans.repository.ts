import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AbstractRepository } from 'src/libs/database/abstract.repository';
import {
  Loan,
  LoanPopulatedDocument,
  LoanStatuses,
} from './entities/loan.entity';

@Injectable()
export class LoansRepository extends AbstractRepository<Loan> {
  protected readonly logger = new Logger(LoansRepository.name);

  constructor(
    @InjectModel(Loan.name)
    loanModel: Model<Loan>,
  ) {
    super(loanModel);
  }

  async updateStatusForReturned(loanId: string, score: number) {
    return this.model.findByIdAndUpdate(
      loanId,
      {
        score,
        returnedAt: new Date(),
        status: LoanStatuses.RETURNED,
      },
      {
        new: true,
      },
    );
  }

  async getAverageScore(bookId: string) {
    return this.model.aggregate([
      {
        $match: {
          bookId,
          status: LoanStatuses.RETURNED,
        },
      },
      {
        $group: {
          _id: '$bookId',
          avgScore: { $avg: '$score' },
        },
      },
    ]);
  }

  async getLoansHistory(userId: string) {
    return this.model
      .find({ userId })
      .populate('book')
      .exec() as unknown as LoanPopulatedDocument[];
  }
}
