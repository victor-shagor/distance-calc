import { IsNotEmpty, IsOptional } from 'class-validator';

export class UpdateDto {
  @IsNotEmpty()
  @IsOptional()
  description: string;

  @IsNotEmpty()
  @IsOptional()
  website: string;

  @IsNotEmpty()
  @IsOptional()
  phone: string;

  @IsNotEmpty()
  @IsOptional()
  contactPerson: string;

  @IsNotEmpty()
  @IsOptional()
  coordinates: string;
}
