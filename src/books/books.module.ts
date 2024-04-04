import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/libs/database';
import { BooksController } from './books.controller';
import { BooksRepository } from './books.repository';
import { BooksService } from './books.service';
import { Book, BookSchema } from './entities/book.entity';

@Module({
  imports: [
    DatabaseModule,
    DatabaseModule.forFeature([{ name: Book.name, schema: BookSchema }]),
  ],
  controllers: [BooksController],
  providers: [BooksService, BooksRepository],
  exports: [BooksService],
})
export class BooksModule {}
