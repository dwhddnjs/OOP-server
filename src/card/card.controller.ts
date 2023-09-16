import { getUserId } from 'src/decorator/get-user-id.decorator';
import { CardService } from './card.service';
import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AtGuard } from 'src/guards/at.guard';

@Controller('card')
export class CardController {
  constructor(private readonly cardService: CardService) {}

  @UseGuards(AtGuard)
  @Post()
  openPack(@Body('packId') packId: number, @getUserId() userid) {
    return this.cardService.openPack(packId, userid);
  }
}
