import { getUser } from 'src/decorator/get-user.decorator';
import { CardService } from './card.service';
import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AtGuard } from 'src/guards/at.guard';

@Controller('card')
export class CardController {
  constructor(private readonly cardService: CardService) {}

  // @Post()
  // openPack(@Body('id') packId: string, @getUser() user) {
  //   console.log(user);
  //   // return this.cardService.openPack(packId, user);
  // }

  @UseGuards(AtGuard)
  @Post()
  openPack(@getUser() user) {
    console.log(user);
    // return this.cardService.openPack(packId, user);
  }
}
