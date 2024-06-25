import { IsString, Length } from 'class-validator'
export class AddAddressDto {
  @IsString()
  @Length(10, 100)
  address: string;
}
