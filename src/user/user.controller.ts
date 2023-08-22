import { UserService } from 'src/user/user.service';
import { Controller, Get, Param } from '@nestjs/common';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get(':id')
  async findUser(@Param() id) {
    return this.userService.findUser(id);
  }
}
