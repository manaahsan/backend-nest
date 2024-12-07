import { IsNotEmpty, IsString } from 'class-validator';

export class CreateAddressDto {
  @IsString()
  @IsNotEmpty()
  line1: string;

  @IsString()
  @IsNotEmpty()
  line2?: string;

  @IsString()
  @IsNotEmpty()
  zip: string;

  @IsString()
  @IsNotEmpty()
  city: string;

  @IsString()
  @IsNotEmpty()
  state: string;
}
