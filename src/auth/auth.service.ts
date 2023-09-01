import { LoginDto } from './dto/login-dto';
import { SignupDto } from './dto/signup-dto';
import { ForbiddenException, Injectable, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { JwtPayload } from './types';
import { ConfigService } from '@nestjs/config';
import { Tokens } from './types/tokens.type';
import { PrismaService } from 'src/prisma/prisma.service';
import * as argon from 'argon2';

@Injectable()
export class AuthService {
  constructor(
    private readonly logger: Logger,
    private readonly jwtService: JwtService,
    private readonly config: ConfigService,
    private readonly prismaService: PrismaService,
  ) {}

  async signup(signupDto: SignupDto): Promise<any> {
    const { email, name, password } = signupDto;

    const salt = await bcrypt.genSalt();
    const hash = await bcrypt.hash(password, salt);

    const user = await this.prismaService.user.create({
      data: {
        email,
        name,
        password: hash,
      },
    });

    const tokens = await this.getTokens(user.id, user.email);
    await this.updateRefresh(user.id, tokens.refresh_token);

    return {
      user,
      tokens,
    };
  }

  async login(loginDto: LoginDto): Promise<any> {
    const { email, password } = loginDto;

    const user = await this.prismaService.user.findUnique({
      where: {
        email: email,
      },
    });

    if (!user) {
      throw new ForbiddenException('유저가 존재하지 않습니다');
    }

    const passwordMatches = await bcrypt.compare(password, user.password);
    if (!passwordMatches) {
      throw new ForbiddenException('패스워드가 다릅니다');
    }

    const tokens = await this.getTokens(user.id, user.email);
    await this.updateRefresh(user.id, tokens.refresh_token);

    return { user, tokens };
  }

  async logout(userId: string): Promise<boolean> {
    await this.prismaService.user.updateMany({
      where: {
        id: userId,
        refreshToken: {
          not: null,
        },
      },
      data: {
        refreshToken: null,
      },
    });
    return true;
  }

  async updateRefresh(userId: string, rt: string): Promise<void> {
    const hash = await argon.hash(rt);
    await this.prismaService.user.update({
      where: {
        id: userId,
      },
      data: {
        refreshToken: hash,
      },
    });
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

  async refreshTokens(userId: string, rt): Promise<any> {
    const user = await this.prismaService.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!user) {
      throw new ForbiddenException('Access Denied');
    }

    const refreshMatches = await argon.verify(user.refreshToken, rt);
    if (!refreshMatches) throw new ForbiddenException('토큰 값이 다릅니다');

    const tokens = await this.getTokens(userId, user.email);
    await this.updateRefresh(user.id, tokens.refresh_token);

    return tokens;
  }
}
