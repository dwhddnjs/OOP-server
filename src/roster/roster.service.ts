import { Injectable } from '@nestjs/common';
import { players } from 'common/players';

@Injectable()
export class RosterService {
  async getPlayer() {
    return players;
  }
}
