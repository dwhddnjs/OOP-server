import { AuthService } from './auth.service';
import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';

import { LoginDto } from './dto/login-dto';
import { RtGuard } from 'src/guards/rt.guard';
import { UserService } from 'src/user/user.service';
import { CreateUserDto } from 'src/user/dto/create-user.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
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
  refreshTokens(@Request() req) {
    const user = req;
    console.log('user: ', user);
    return this.authService.refreshTokens(user.id, user.refreshToken);
  }

  // @Post('logout')
  // @HttpCode(HttpStatus.OK)
  // logout(userId: string): Promise<boolean> {
  //   return this.authService.logout(userId);
  // }
}
