import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class NewsService {
  constructor(private readonly configService: ConfigService) {}

  async getNews() {
    const naverId = await this.configService.get<string>('NAVER_ID');
    const naverSecret = await this.configService.get<string>('NAVER_SECRET');
    const naverUrl = await this.configService.get<string>('NAVER_URL');

    const data = await axios({
      url: naverUrl,
      method: 'get',

      params: {
        query: 'lck',
        display: 10,
        start: 1,
        sort: 'date',
      },
      headers: {
        'X-Naver-Client-Id': naverId,
        'X-Naver-Client-Secret': naverSecret,
      },
    });

    return data?.data.items;
  }
}
