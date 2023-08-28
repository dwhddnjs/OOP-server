import { Module } from '@nestjs/common';
import { StoreController } from './store.controller';
import { StoreService } from './store.service';
import { User } from 'src/entity/user.entity';
import { Pack } from 'src/entity/pack.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from 'src/user/user.service';

@Module({
  imports: [TypeOrmModule.forFeature([User, Pack])],
  controllers: [StoreController],
  providers: [StoreService, UserService],
})
export class StoreModule {}
