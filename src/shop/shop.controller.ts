import { PurChasePackDto } from './dto/purchase-pack-dto';
import { Pack } from './pack.entity';
import { ShopService } from './shop.service';
import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';

@Controller('shop')
export class ShopController {
  constructor(private readonly shopService: ShopService) {}

  @Post()
  @HttpCode(HttpStatus.OK)
  async purchasePack(@Body() purChasePackDto: PurChasePackDto) {
    return this.shopService.purchasePack(purChasePackDto);
  }
}
