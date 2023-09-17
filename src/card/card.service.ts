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
    private readonly logger: LoggerService,
  ) {}

  async openPack(packId: number, userId: string) {
    const randomDogCard = this.configService.get<string>('DOG_API_URL');

    const data = await firstValueFrom(
      this.httpService.get<any>(randomDogCard).pipe(
        catchError((error: AxiosError) => {
          this.logger.error(error.response.data);
          throw 'An error happened!';
        }),
      ),
    );

    console.log('data: ', data);

    // return await this.prismaService.pack.deleteMany({
    //   where: {
    //     id: packId,
    //     userId,
    //   },
    // });
  }
}
