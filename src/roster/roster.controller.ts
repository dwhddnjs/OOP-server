import { RosterService } from './roster.service';
import { Controller, Get } from '@nestjs/common';

@Controller('roster')
export class RosterController {
  constructor(private readonly rosterService: RosterService) {}

  @Get()
  getRoster() {
    return this.rosterService.getRoster();
  }
}
