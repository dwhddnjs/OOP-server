import { PrismaService } from './../prisma/prisma.service';
import { ConflictException, Injectable } from '@nestjs/common';
import { players } from 'common/players';
import { PlayersDto } from './dto/players-dto';
import { Player } from './types/player';

@Injectable()
export class RosterService {
  constructor(private readonly prismaService: PrismaService) {}
  async getPlayer() {
    return players;
  }

  async getSavedRoster(userId: string) {
    const user = await this.prismaService.user.findUnique({
      where: { id: userId },
      select: {
        roster: true,
      },
    });

    if (!user) {
      throw new ConflictException('계정이 존재하지 않습니다');
    }

    return user.roster;
  }

  async saveRoster(playersDto: PlayersDto, userId) {
    const user = await this.prismaService.user.findUnique({
      where: { id: userId },
      select: {
        roster: true,
      },
    });

    if (!user) {
      throw new ConflictException('계정이 존재하지 않습니다');
    }

    const newRoster = await this.prismaService.roster.create({
      data: {
        title: playersDto.title,
        user: {
          connect: {
            id: userId,
          },
        },
      },
    });

    // console.log('newRoster: ', newRoster);

    const roster = await playersDto.players.map((player) => {
      return this.prismaService.player.create({
        data: {
          nickname: player.nickname,
          position: player.position,
          img: player.img,
          roster: {
            connect: {
              id: newRoster.id,
            },
          },
        },
      });
    });

    const promiseAllRoster = await Promise.all(roster);

    const updatedRoster = await this.prismaService.roster.update({
      where: {
        id: newRoster.id,
      },
      data: {
        players: {
          connect: promiseAllRoster,
        },
      },
    });

    console.log('updatedRoster: ', updatedRoster);

    await this.prismaService.user.update({
      where: {
        id: userId,
      },
      data: {
        roster: {
          set: [...user.roster, updatedRoster],
        },
      },
    });
  }
}
