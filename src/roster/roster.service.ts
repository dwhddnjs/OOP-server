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
    const $list = $('record_list_item__2fFsp');

    const result = [];
    $list.each((i, el) => {
      const imgData = $(el)
        .find('.record_list_profile__VF6_W > img')
        .attr('src');

      console.log('imgData: ', imgData);
      result.push(imgData);
    });
    // record_list_item__2fFsp

    console.log('result: ', result);
  }
}
