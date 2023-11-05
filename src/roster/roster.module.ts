import { Module } from '@nestjs/common';
import { RosterController } from './roster.controller';
import { RosterService } from './roster.service';
import { JwtService } from '@nestjs/jwt';

@Module({
  controllers: [RosterController],
  providers: [RosterService, JwtService],
})
export class RosterModule {}
