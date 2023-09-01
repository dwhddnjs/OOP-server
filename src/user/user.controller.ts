import { AtGuard } from 'src/guards/at.guard';
import { UserService } from './user.service';
import { Controller, Get, Param, UseGuards } from '@nestjs/common';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(AtGuard)
  @Get(':id')
  findById(@Param('id') userId: string) {
    return this.userService.findById(userId);
  }
}
