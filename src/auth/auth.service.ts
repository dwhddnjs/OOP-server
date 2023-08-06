import { LoginDto } from './dto/login-dto';
import { SignupDto } from './dto/signup-dto';
import { Injectable, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/user.entity';
import { UserService } from 'src/user/user.service';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async signup(signupDto: SignupDto): Promise<User> {
    const { email, username, password } = signupDto;
    const user = new User();
    const salt = await bcrypt.genSalt();
    const hash = await bcrypt.hash(password, salt);
    user.email = email;
    user.username = username;
    user.password = hash;
    return await this.userRepository.save(user);
  }

  async login(loginDto: LoginDto) {
    const user = await this.userService.findOne(loginDto.email);
    const payload = { email: user.email, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.userService.findOne(email);
    const isMatch = await bcrypt.compare(password, user.password);
    if (user && isMatch) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }
}
