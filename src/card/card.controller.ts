import { getUserId } from 'src/decorator/get-user-id.decorator';
import { CardService } from './card.service';
import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { AtGuard } from 'src/guards/at.guard';

@Controller('card')
export class CardController {
  constructor(private readonly cardService: CardService) {}

  @UseGuards(AtGuard)
  @Post()
  openPack(@Body('packId') packId: number, @getUserId() userId) {
    return this.cardService.openPack(packId, userId);
  }

  @UseGuards(AtGuard)
  @Get()
  getCardPagination(@Query('page') page: number) {
    console.log('page: ', page);
    return this.cardService.getCardPagination(page);
  }
}
