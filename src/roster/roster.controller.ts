import { RosterService } from './roster.service';
import { Controller, Get } from '@nestjs/common';

@Controller('roster')
export class RosterController {
  constructor(private readonly rosterService: RosterService) {}

  @Get()
  getPlayer() {
    return this.rosterService.getPlayer();
  }
}
