import { getUserId } from 'src/decorator/get-user-id.decorator';
import { CardService } from './card.service';
import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { AtGuard } from 'src/guards/at.guard';

@Controller('card')
export class CardController {
  constructor(private readonly cardService: CardService) {}

  @UseGuards(AtGuard)
  @Get()
  getCards(@getUserId() userId: string) {
    return this.cardService.getCards(userId);
  }

  @UseGuards(AtGuard)
  @Post()
  openPack(@Body('packId') packId: number, @getUserId() userId) {
    return this.cardService.openPack(packId, userId);
  }

  @UseGuards(AtGuard)
  @Get()
  getCardPagination(@Query('page') page: number) {
    return this.cardService.getCardPagination(page);
  }
}
