import { AtGuard } from 'src/guards/at.guard';
import { StoreService } from './store.service';
import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { PurchaseDto } from './dto/purchase.dto';
import { getUserId } from 'src/decorator/get-user-id.decorator';

@Controller('store')
export class StoreController {
  constructor(private readonly storeService: StoreService) {}

  @UseGuards(AtGuard)
  @Get()
  ownedPacks(@getUserId() userId: string) {
    return this.storeService.ownedPacks(userId);
  }

  @UseGuards(AtGuard)
  @Post()
  purchase(@Body() purchaseDto: PurchaseDto, @getUserId() userId: string) {
    return this.storeService.purChase(purchaseDto, userId);
  }
}
