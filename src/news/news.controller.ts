import { NewsService } from './news.service';
import { Controller, Get } from '@nestjs/common';

@Controller('news')
export class NewsController {
  constructor(private readonly newsService: NewsService) {}

  @Get()
  getNews() {
    return this.newsService.getNews();
  }
}
