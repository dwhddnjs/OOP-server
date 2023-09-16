import { ConfigService } from '@nestjs/config';
import { UserService } from './../user/user.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CardService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly userService: UserService,
    private readonly configService: ConfigService,
  ) {}

  async openPack(packId: number, userId: string) {
    // return await this.prismaService.pack.deleteMany({
    //   where: {
    //     id: packId,
    //     userId,
    //   },
    // });
  }
}
