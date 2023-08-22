import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { Pack } from '../pack.entity';

export class PurChasePackDto {
  id: string;
  pack: Pack;
}
