import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { BooksService } from './books.service';
import { CreateBookDto } from './dto/create-book.dto';

@ApiTags('Books')
@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @ApiOperation({ summary: 'Create book' })
  @Post()
  create(@Body() createBookDto: CreateBookDto) {
    return this.booksService.create(createBookDto);
  }
  @ApiOperation({ summary: 'Get all books' })
  @Get()
  findAll() {
    return this.booksService.findAll();
  }

  @ApiOperation({ summary: 'Get book by id' })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.booksService.findOne(id);
  }
}
