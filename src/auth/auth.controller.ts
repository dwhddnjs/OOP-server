import { TransformInterceptor } from './../interceptor/response-message.interceptor';
import { AuthService } from './auth.service';
import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Get,
  Req,
  Request,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';

import { LoginDto } from './dto/login-dto';
import { RtGuard } from 'src/guards/rt.guard';
import { UserService } from 'src/user/user.service';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { AtGuard } from 'src/guards/at.guard';
import { getUserId } from 'src/decorator/get-user-id.decorator';
import { AuthGuard } from '@nestjs/passport';
import { GoogleAuthDto } from './dto/google-auth-dto';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

  @Post('login')
  @HttpCode(HttpStatus.OK)
  login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  @Post('signup')
  @HttpCode(HttpStatus.CREATED)
  signup(@Body() signupDto: CreateUserDto) {
    return this.userService.createUser(signupDto);
  }

  @UseGuards(RtGuard)
  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  refreshTokens(@Req() req) {
    const user = req;
    return this.authService.refreshTokens(user);
  }

  @UseGuards(AtGuard)
  @Post('logout')
  @HttpCode(HttpStatus.OK)
  logout(@getUserId() userId) {
    return this.authService.logout(userId);
  }

  @Post('google')
  googleAuth(@Body() googleAuthDto: GoogleAuthDto) {
    return this.authService.googleAuth(googleAuthDto);
  }
}
