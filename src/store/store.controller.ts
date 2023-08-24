import { getUser } from 'src/decorator/get-user';
import { StoreService } from './store.service';
import { Controller, Post } from '@nestjs/common';
import { User } from 'src/entity/user.entity';

@Controller('store')
export class StoreController {
  constructor(private readonly storeService: StoreService) {}

  @Post()
  purchase(@getUser() user: User) {
    console.log(user);
  }
}
