import { Player } from '../types/player';
import {
  IsArray,
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsString,
} from 'class-validator';
import { Type } from 'class-transformer';

export class UpdateRosterDto {
  @IsNumber()
  id: number;
  @IsString()
  title: string;
  @IsArray()
  players: Player[];
}
