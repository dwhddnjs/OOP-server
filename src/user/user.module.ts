import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../entity/user.entity';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { Pack } from 'src/entity/pack.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Pack])],
  providers: [UserService],
  exports: [UserService],
  controllers: [UserController],
})
export class UserModule {}
