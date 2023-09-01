import { PrismaService } from './../prisma/prisma.service';
import { UserService } from './../user/user.service';
import { ConflictException, Injectable } from '@nestjs/common';
import { PurchaseDto } from './dto/purchase.dto';

@Injectable()
export class StoreService {
  constructor(
    private readonly userService: UserService,
    private readonly prismaService: PrismaService,
  ) {}

  async ownedPacks(userId) {
    return await this.prismaService.user.findUnique({
      where: {
        id: userId,
      },
      select: {
        packs: true,
      },
    });
  }

  async purChase(purChaseDto: PurchaseDto) {
    const user = await this.prismaService.user.findUnique({
      where: { id: purChaseDto.userId },
      select: {
        packs: true,
      },
    });

    if (!user) {
      throw new ConflictException('계정이 존재하지 않습니다');
    }

    const pack = await this.prismaService.pack.create({
      data: {
        label: purChaseDto.label,
        price: purChaseDto.price,
        user: {
          connect: {
            id: purChaseDto.userId,
          },
        },
      },
    });

    return await this.prismaService.user.update({
      where: { id: purChaseDto.userId },
      data: {
        packs: {
          set: [...user.packs, pack],
        },
      },
    });
  }
}
