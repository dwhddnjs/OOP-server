import { ConfigService } from '@nestjs/config';
import { UserService } from './../user/user.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { Injectable, LoggerService } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { catchError, firstValueFrom } from 'rxjs';
import { AxiosError } from 'axios';
import { getCardTier } from 'common/getRandomTier';

@Injectable()
export class CardService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly userService: UserService,
    private readonly configService: ConfigService,
    private readonly httpService: HttpService,
  ) {}

  async getCards(userId: string) {
    const user = await this.prismaService.user.findUnique({
      where: {
        id: userId,
      },
      select: {
        cards: true,
      },
    });
    return user.cards;
  }

  async getCardPagination(page) {
    return;
  }

  async openPack(packId: number, userId: string) {
    const user = await this.prismaService.user.findUnique({
      where: {
        id: userId,
      },
      select: {
        cards: true,
      },
    });

    const pack = await this.prismaService.pack.findUnique({
      where: {
        id: packId,
      },
    });

    const result = [];

    const randomDogCard = this.configService.get<string>('DOG_API_URL');

    for (let i = 0; i < 5; i++) {
      const { data } = await firstValueFrom(
        this.httpService.get<any>(randomDogCard).pipe(
          catchError((error: AxiosError) => {
            throw 'An error happened!';
          }),
        ),
      );

      if (data) {
        console.log(data);
        const splitUrl = data.message.split('/');
        const title = splitUrl[splitUrl.length - 2].replace('-', ' ');
        const item = await this.prismaService.card.create({
          data: {
            title: title,
            image: data.message,
            tier: getCardTier(pack.label),
            userId: userId,
          },
        });
        result.push(item);
      }
    }

    if (result.length > 0) {
      await this.prismaService.user.update({
        where: {
          id: userId,
        },
        data: {
          cards: {
            set: [...user.cards, ...result],
          },
        },
      });

      await this.prismaService.pack.deleteMany({
        where: {
          id: packId,
          userId,
        },
      });
      return result;
    } else {
      throw '에러';
    }
  }
}
