import { LoginDto } from './dto/login-dto';
import { SignupDto } from './dto/signup-dto';
import { ForbiddenException, Injectable, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entity/user.entity';
import { UserService } from 'src/user/user.service';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { JwtPayload } from './types';
import { ConfigService } from '@nestjs/config';
import { Tokens } from './types/tokens.type';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    private config: ConfigService,
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async signup(signupDto: SignupDto): Promise<any> {
    const { email, username, password } = signupDto;

    const user = new User();
    const tokens = await this.getTokens(email, user.id);
    const salt = await bcrypt.genSalt();
    const hash = await bcrypt.hash(password, salt);
    user.email = email;
    user.username = username;
    user.password = hash;
    user.refreshToken = tokens.refresh_token;
    await this.userRepository.save(user);

    return {
      user,
      tokens,
    };
  }

  async login(loginDto: LoginDto): Promise<any> {
    const user = await this.userService.findOne(loginDto.email);

    if (!user) {
      throw new ForbiddenException('유저가 존재하지 않습니다');
    }

    const token = await this.getTokens(user.id, user.email);
    await this.updateRefresh(user.id, token.refresh_token);

    return { user, token };
  }

  async logout(userId): Promise<boolean> {
    const user = await this.userRepository.findOneBy({ id: userId });
    user.refreshToken = null;
    return true;
  }

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.userService.findOne(email);
    const isMatch = await bcrypt.compare(password, user.password);
    if (user && isMatch) {
      const { ...result } = user;
      return result;
    }
    return null;
  }

  async updateRefresh(id: string, rt: string): Promise<any> {
    const user = await this.userRepository.findOneBy({ id });
    user.refreshToken = rt;
    return;
  }

  async getTokens(userId: string, email: string): Promise<Tokens> {
    const jwtPayload: JwtPayload = {
      sub: userId,
      email,
    };

    const [at, rt] = await Promise.all([
      this.jwtService.signAsync(jwtPayload, {
        secret: this.config.get<string>('ACCESS_SECRET_KEY'),
        expiresIn: '30m',
      }),
      this.jwtService.signAsync(jwtPayload, {
        secret: this.config.get<string>('REFRESH_SECRET_KEY'),
        expiresIn: '14d',
      }),
    ]);

    return {
      access_token: at,
      refresh_token: rt,
    };
  }
}
