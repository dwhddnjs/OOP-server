import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class PurchaseDto {
  @IsNotEmpty()
  @IsString()
  userId: string;

  @IsNotEmpty()
  @IsString()
  label: string;

  @IsNotEmpty()
  price: number;
}
