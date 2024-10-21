import { Injectable } from '@nestjs/common';
import { User } from './entities/user.entity';
// import { CreateUserDto } from './dto/create-user.dto';
// import { UpdateUserDto } from './dto/update-user.dto';

const USERS: Array<User> = [
  { id: '1', username: 'Alice', password: 'password1' },
  { id: '2', username: 'Bob', password: 'password2' },
  { id: '3', username: 'John', password: 'password3' },
];

@Injectable()
export class UsersService {
  // create(createUserDto: CreateUserDto) {
  //   return 'This action adds a new user';
  // }

  findAll() {
    return USERS;
  }

  findOne(id: string) {
    return USERS.filter((user) => user.id === id);
  }

  // update(id: number, updateUserDto: UpdateUserDto) {
  //   return `This action updates a #${id} user`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} user`;
  // }
}
