import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { CreateUserDto } from './dto/create-user-dto';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const user = new User();
    user.name = createUserDto.name;
    user.email = createUserDto.email;
    user.password = createUserDto.password;
    return await this.userRepository.save(user);
  }

  async findOne(username: string): Promise<User> {
    return this.userRepository.findOneBy({ name: username });
  }
}
