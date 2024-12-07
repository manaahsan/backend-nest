import {
  IsEmail,
  IsNotEmpty,
  isNotEmptyObject,
  IsNumber,
  IsString,
  Validate,
  ValidateNested,
} from 'class-validator';
import { CreateAddressDto } from './createAddress.dto';
import { Type } from 'class-transformer';

export class CreateCustomerDto {
  @IsNumber()
  id: number;

  @IsEmail()
  @IsString()
  email: string;

  @IsNumber()
  age: number;

  @ValidateNested()
  @IsNotEmpty({ message: 'Address must be a non-empty object' })
  @Type(() => CreateAddressDto)
  address: CreateAddressDto;
}
