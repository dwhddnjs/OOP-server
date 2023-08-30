import { Logger, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserModule } from 'src/user/user.module';
import { PassportModule } from '@nestjs/passport';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/entity/user.entity';
import { AtStrategy } from './strategies/at.strategy';
import { RtStrategy } from './strategies/rt.strategy';

@Module({
  imports: [
    UserModule,
    PassportModule,
    JwtModule.register({}),
    TypeOrmModule.forFeature([User]),
  ],
  providers: [AuthService, AtStrategy, RtStrategy, Logger],
  controllers: [AuthController],
})
export class AuthModule {}
