import { Module } from '@nestjs/common';
import { ShopController } from './shop.controller';
import { ShopService } from './shop.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/user/user.entity';
import { Pack } from './pack.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Pack])],
  controllers: [ShopController],
  providers: [ShopService],
})
export class ShopModule {}
