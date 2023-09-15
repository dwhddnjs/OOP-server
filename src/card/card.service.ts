import { PrismaService } from 'src/prisma/prisma.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CardService {
  constructor(private readonly prismaService: PrismaService) {}

  // async openPack(packId: string) {
  //   const pack = this.prismaService.
  // }
}
