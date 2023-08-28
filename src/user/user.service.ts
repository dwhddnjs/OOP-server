import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from '../entity/user.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async findUser(id: string) {
    return await this.userRepository.findOne({ where: { id: id } });
  }

  async findUserEmail(email: string) {
    return await this.userRepository.findOne({ where: { email: email } });
  }
}
