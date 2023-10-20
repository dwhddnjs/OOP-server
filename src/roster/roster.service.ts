import { PrismaService } from './../prisma/prisma.service';
import { ConflictException, Injectable } from '@nestjs/common';
import { players } from 'common/players';
import { PlayersDto } from './dto/players-dto';

@Injectable()
export class RosterService {
  constructor(private readonly prismaService: PrismaService) {}
  async getPlayer() {
    return players;
  }

  async saveRoster(players: PlayersDto[], userId) {
    const user = await this.prismaService.user.findUnique({
      where: { id: userId },
      select: {
        roster: true,
      },
    });

    if (!user) {
      throw new ConflictException('계정이 존재하지 않습니다');
    }

    const roster = players.map((player) => {
      const newPlayer = this.prismaService.player.create({
        data: {
          nickname: player.nickname,
          team: player.team,
          name: player.name,
          img: player.img,
          user: {
            connect: {
              id: userId,
            },
          },
        },
      });
    });
  }
}
