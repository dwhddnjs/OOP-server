import { ForbiddenException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/user.entity';
import { Repository } from 'typeorm';
import { Pack } from './pack.entity';
import { PurChasePackDto } from './dto/purchase-pack-dto';

@Injectable()
export class ShopService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    @InjectRepository(Pack) private readonly packRepository: Repository<Pack>,
  ) {}

  async purchasePack(purChasePackDto: PurChasePackDto): Promise<any> {
    const { id, pack } = purChasePackDto;
    const user = await this.userRepository.findOneBy({ id: id });
    if (!user) {
      throw new ForbiddenException('유저가 존재하지 않습니다');
    }

    const packs = [...user.packs, pack];
    user.packs = packs;
    await this.userRepository.save(user);
    return;
  }
}
