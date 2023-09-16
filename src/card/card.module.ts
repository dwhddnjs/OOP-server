import { Module } from '@nestjs/common';
import { CardController } from './card.controller';
import { CardService } from './card.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import { ConfigService } from '@nestjs/config';

@Module({
  controllers: [CardController],
  providers: [
    CardService,
    PrismaService,
    JwtService,
    UserService,
    ConfigService,
  ],
})
export class CardModule {}
