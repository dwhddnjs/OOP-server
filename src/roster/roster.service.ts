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
      include: {
        roster: {
          orderBy: {
            id: 'desc',
          },
          include: {
            players: true,
          },
        },
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
        userId: userId,
      },
    });

    const playerData = playersDto.players.map((player) => ({
      nickname: player.nickname,
      position: player.position,
      img: player.img,
      rosterId: newRoster.id,
    }));

    const newPlayers = playerData.map((player) =>
      this.prismaService.player.create({
        data: player,
      }),
    );

    const promiseAllRoster = await Promise.all(newPlayers);

    await this.prismaService.roster.update({
      where: {
        id: newRoster.id,
      },
      data: {
        players: {
          set: promiseAllRoster,
        },
      },
      include: {
        players: true,
      },
    });

    this.prismaService.user.update({
      where: {
        id: userId,
      },
      data: {
        roster: {
          set: [newRoster, ...user.roster],
        },
      },
      include: {
        roster: true,
      },
    });

    const result = await this.prismaService.user.findUnique({
      where: { id: userId },
      include: {
        roster: {
          orderBy: {
            id: 'desc',
          },
          include: {
            players: true,
          },
        },
      },
    });

    return result.roster;
  }
}
