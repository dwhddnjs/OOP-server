import { PrismaService } from './../prisma/prisma.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class StoreService {
  constructor(private readonly PrismaService: PrismaService) {}

  async purchase(userId: string): Promise<any> {
    return 'sdsaddsaadsads';
  }
}
