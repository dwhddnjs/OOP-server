import { getUserId } from 'src/decorator/get-user-id.decorator';
import { PlayersDto } from './dto/players-dto';
import { RosterService } from './roster.service';
import { Body, Controller, Get, Post } from '@nestjs/common';

@Controller('roster')
export class RosterController {
  constructor(private readonly rosterService: RosterService) {}

  @Get()
  getPlayer() {
    return this.rosterService.getPlayer();
  }

  @Post()
  saveRoster(@Body() players: PlayersDto[], @getUserId() userId: string) {
    return this.rosterService.saveRoster(players, userId);
  }
}
