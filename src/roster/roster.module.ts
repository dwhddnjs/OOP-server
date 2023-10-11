import { Module } from '@nestjs/common';
import { RosterController } from './roster.controller';
import { RosterService } from './roster.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [
    HttpModule.registerAsync({
      useFactory: () => ({
        timeout: 5000,
        maxRedirects: 5,
      }),
    }),
  ],
  controllers: [RosterController],
  providers: [RosterService],
})
export class RosterModule {}
