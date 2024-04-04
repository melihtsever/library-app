import { Injectable } from '@nestjs/common';
import { BooksRepository } from './books.repository';
import { CreateBookDto } from './dto/create-book.dto';

@Injectable()
export class BooksService {
  constructor(private readonly booksRepository: BooksRepository) {}

  create(createBookDto: CreateBookDto) {
    return this.booksRepository.create(createBookDto);
  }

  findAll() {
    return this.booksRepository.find({});
  }

  findOne(id: string) {
    return this.booksRepository.findOne({ _id: id });
  }

  updateScore(id: string, score: number) {
    return this.booksRepository.updateScore(id, score);
  }
}
