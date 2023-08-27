import { getUser } from 'src/decorator/get-user';
import { StoreService } from './store.service';
import { Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { User } from 'src/entity/user.entity';
import { AuthGuard } from '@nestjs/passport';
import { AtGuard } from 'src/guards/at.guard';
import { Request } from 'express';

@Controller('store')
export class StoreController {
  constructor(private readonly storeService: StoreService) {}

  @Post()
  purchase() {
    return 'adsdasdsa';
  }
}
