import { UserService } from 'src/user/user.service';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Pack } from 'src/entity/pack.entity';
import { User } from 'src/entity/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class StoreService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    @InjectRepository(Pack) private readonly packRepository: Repository<Pack>,
    private readonly userService: UserService,
  ) {}

  async packs(userId: number): Promise<any> {
    const user = await this.userService.findUser(userId);
    if (user && !user.packs) {
      return [];
    }
    return user.packs;
  }

  async purchase(userId): Promise<any> {
    const user = await this.userService.findUser(userId);
    console.log('user: ', user);

    const pack = new Pack();
    user.packs = [...user.packs, pack];

    return await this.userRepository.save(user);
  }
}
