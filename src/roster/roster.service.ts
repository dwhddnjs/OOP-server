import { ConfigService } from '@nestjs/config';
import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import axios, { AxiosError } from 'axios';
import { catchError, firstValueFrom } from 'rxjs';
import cheerio from 'cheerio';

@Injectable()
export class RosterService {
  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {}

  async getRoster() {
    const url = this.configService.get<string>('ESPORTS_URL');

    const { data } = await firstValueFrom(
      this.httpService.get<any>(url).pipe(
        catchError((error: AxiosError) => {
          console.log(error);
          throw 'An error happened!';
        }),
      ),
    );

    const $ = cheerio.load(data);
    const $bodyList = $('li.record_list_profile__VF6_W')
      .children('img')
      .attr('src');

    console.log('$bodyList: ', $bodyList);
  }
}
