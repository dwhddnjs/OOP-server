import { AtGuard } from 'src/guards/at.guard';
import { StoreService } from './store.service';
import { Controller, Get, Param, UseGuards } from '@nestjs/common';

@Controller('store')
export class StoreController {
  constructor(private readonly storeService: StoreService) {}

  @Get()
  purchase() {
    return 'adssadadsdsaa';
  }
}
