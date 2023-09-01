import { AtGuard } from 'src/guards/at.guard';
import { StoreService } from './store.service';
import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { PurchaseDto } from './dto/purchase.dto';

@Controller('store')
export class StoreController {
  constructor(private readonly storeService: StoreService) {}

  @UseGuards(AtGuard)
  @Get()
  ownedPacks(@Query('userId') userId: string) {
    return this.storeService.ownedPacks(userId);
  }

  @UseGuards(AtGuard)
  @Post()
  purchase(@Body() purchaseDto: PurchaseDto) {
    return this.storeService.purChase(purchaseDto);
  }
}
