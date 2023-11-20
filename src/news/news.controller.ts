import { NewsService } from './news.service';
import { Controller, Get, Query } from '@nestjs/common';

@Controller('news')
export class NewsController {
  constructor(private readonly newsService: NewsService) {}

  @Get()
  getNews(@Query('page') page: string) {
    return this.newsService.getNews(page);
  }
}
