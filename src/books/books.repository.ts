import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AbstractRepository } from 'src/libs/database/abstract.repository';
import { Book } from './entities/book.entity';

@Injectable()
export class BooksRepository extends AbstractRepository<Book> {
  protected readonly logger = new Logger(BooksRepository.name);

  constructor(
    @InjectModel(Book.name)
    bookModel: Model<Book>,
  ) {
    super(bookModel);
  }

  async updateScore(id: string, score: number) {
    return this.model.findByIdAndUpdate(id, { score });
  }
}
