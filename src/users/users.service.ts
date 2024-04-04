import { Injectable } from '@nestjs/common';
import { UsersRepository } from './ users.repository';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  create(createUserDto: CreateUserDto) {
    return this.usersRepository.create(createUserDto);
  }

  findAll() {
    return this.usersRepository.find({});
  }

  findOne(id: string) {
    return this.usersRepository.findOne({ _id: id });
  }
}
