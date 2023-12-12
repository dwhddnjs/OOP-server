import { UserService } from './../user/user.service';
import { LoginDto } from './dto/login-dto';
import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { JwtPayload } from './types';
import { ConfigService } from '@nestjs/config';
import { Tokens } from './types/tokens.type';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly logger: Logger,
    private readonly jwtService: JwtService,
    private readonly config: ConfigService,
    private readonly prismaService: PrismaService,
    private readonly userService: UserService,
  ) {}

  async login(loginDto: LoginDto): Promise<any> {
    const user = await this.validateUser(loginDto);

    const tokens = await this.getTokens(user.id, user.email);
    await this.updateRefresh(user.id, tokens.refresh_token);

    return { user, tokens };
  }

  async logout(userId) {
    return await this.prismaService.user.update({
      where: {
        id: userId,
      },
      data: {
        refreshToken: null,
      },
    });
  }

  async validateUser(loginDto: LoginDto) {
    const user = await this.userService.findByEmail(loginDto.email);

    if (user) {
      const passwordMatches = await bcrypt.compare(
        loginDto.password,
        user.password,
      );
      if (passwordMatches) {
        const { password, ...result } = user;
        return result;
      } else {
        throw new UnauthorizedException('아이디가 존재하지않습니다');
      }
    } else {
      throw new UnauthorizedException('아이디가 존재하지않습니다');
    }
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

  async updateRefresh(userId: string, rt: string): Promise<any> {
    return await this.prismaService.user.update({
      where: {
        id: userId,
      },
      data: {
        refreshToken: rt,
      },
    });
  }

  async refreshTokens(user): Promise<any> {
    const currentRefresh = user.headers.authorization?.split(' ')[1] ?? [];

    const findUser = await this.prismaService.user.findUnique({
      where: {
        id: user.user.sub,
        refreshToken: currentRefresh,
      },
    });

    if (findUser) {
      const tokens = await this.getTokens(user.user.sub, user.user.email);
      await this.updateRefresh(user.user.sub, tokens.refresh_token);
      return tokens;
    } else {
      return;
    }
  }
}
