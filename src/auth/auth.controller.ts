import { AuthService } from './auth.service';
import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common';

import { SignupDto } from './dto/signup-dto';
import { LoginDto } from './dto/login-dto';
import { RtGuard } from 'src/guards/rt.guard';
import { getUser } from 'src/decorator/get-user.decorator';
import { Public } from 'src/decorator/public.decorator';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @Post('login')
  @HttpCode(HttpStatus.OK)
  login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  @Post('logout')
  @HttpCode(HttpStatus.OK)
  logout(userId: string): Promise<boolean> {
    return this.authService.logout(userId);
  }

  @Public()
  @Post('signup')
  @HttpCode(HttpStatus.CREATED)
  signup(@Body() signupDto: SignupDto) {
    return this.authService.signup(signupDto);
  }

  @Public()
  @Post('refresh')
  @UseGuards(RtGuard)
  @HttpCode(HttpStatus.OK)
  refreshTokens(@getUser() user) {
    return this.authService.refreshTokens(user.id, user.refreshToken);
  }
}
