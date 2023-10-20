import { players } from 'common/players';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class PlayersDto {
  @IsString()
  nickname: string;
  @IsString()
  team: string;
  @IsString()
  name: string;
  @IsString()
  img: string;
}
