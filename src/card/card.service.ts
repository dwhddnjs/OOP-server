import { ConfigService } from '@nestjs/config';
import { UserService } from './../user/user.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { Injectable, LoggerService } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { catchError, firstValueFrom } from 'rxjs';
import { AxiosError } from 'axios';

@Injectable()
export class CardService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly userService: UserService,
    private readonly configService: ConfigService,
    private readonly httpService: HttpService,
  ) {}

  async openPack(packId: number, userId: string) {
    const user = await this.prismaService.user.findUnique({
      where: {
        id: userId,
      },
      select: {
        cards: true,
      },
    });

    console.log('user: ', user);

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

      const item = await this.prismaService.card.create({
        data: {
          title: 'hihi',
          image: data.message,
          userId: userId,
        },
      });
      result.push(item);
    }

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
    return;
  }
}
