import { Module, LoggerService } from '@nestjs/common';
import { CardController } from './card.controller';
import { CardService } from './card.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { HttpModule, HttpService } from '@nestjs/axios';

@Module({
  controllers: [
    CardController,
    HttpModule.registerAsync({
      useFactory: () => ({
        timeout: 5000,
        maxRedirects: 5,
      }),
    }) as any,
  ],
  providers: [
    CardService,
    PrismaService,
    JwtService,
    UserService,
    ConfigService,
    // HttpService,
  ],
})
export class CardModule {}
