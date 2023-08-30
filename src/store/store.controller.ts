import { getUser } from 'src/decorator/get-user';
import { StoreService } from './store.service';
import {
  Controller,
  Get,
  Post,
  Req,
  UseGuards,
  Body,
  Param,
} from '@nestjs/common';
import { AtGuard } from 'src/guards/at.guard';
import { Public } from 'src/decorator/public.decorator';

@Controller('store')
export class StoreController {
  constructor(private readonly storeService: StoreService) {}

  @Public()
  @UseGuards(AtGuard)
  @Get(':id')
  packs(@Param('id') userId: number) {
    return this.storeService.packs(userId);
  }

  @Public()
  @UseGuards(AtGuard)
  @Post()
  purchase(@Body('userId') userId: number) {
    return this.storeService.purchase(userId);
  }
}
