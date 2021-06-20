import { IsLatLong, IsNotEmpty } from 'class-validator';

export class DistanceDto {
  @IsNotEmpty()
  @IsLatLong()
  from: string;

  @IsNotEmpty()
  @IsLatLong()
  to: string;
}
