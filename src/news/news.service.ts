import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class NewsService {
  constructor(private readonly configService: ConfigService) {}

  async getNews(page: string) {
    console.log('page: ', page);
    const naverId = this.configService.get<string>('NAVER_ID');
    const naverSecret = this.configService.get<string>('NAVER_SECRET');
    const naverUrl = this.configService.get<string>('NAVER_URL');

    const data = await axios({
      url: naverUrl,
      method: 'get',

      params: {
        query: 'lck',
        display: 10,
        start: page,
        sort: 'date',
      },
      headers: {
        'X-Naver-Client-Id': naverId,
        'X-Naver-Client-Secret': naverSecret,
      },
    });

    return {
      page: parseInt(page),
      data: data?.data?.items,
    };
  }
}
