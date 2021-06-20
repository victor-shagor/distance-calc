import { IsLatLong, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  description: string;

  @IsNotEmpty()
  @IsOptional()
  website: string;

  @IsNotEmpty()
  phone: string;

  @IsNotEmpty()
  contactPerson: string;

  @IsNotEmpty()
  @IsLatLong()
  coordinates: string;
}
