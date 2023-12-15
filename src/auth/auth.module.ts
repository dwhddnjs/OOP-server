import { Logger, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { AtStrategy } from './strategies/at.strategy';
import { RtStrategy } from './strategies/rt.strategy';
import { UserService } from 'src/user/user.service';
import { GoogleStrategy } from './strategies/google.strategy';

@Module({
  imports: [PassportModule, JwtModule.register({})],
  providers: [
    AuthService,
    UserService,
    AtStrategy,
    RtStrategy,
    GoogleStrategy,
    Logger,
  ],
  controllers: [AuthController],
})
export class AuthModule {}
