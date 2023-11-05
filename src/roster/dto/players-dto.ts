import { Player } from './../types/player';
import { IsArray, IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { Type } from 'class-transformer';

export class PlayersDto {
  @IsString()
  title: string;
  @IsArray()
  players: Player[];
}
