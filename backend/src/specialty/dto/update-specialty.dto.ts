import { IsString, Length, IsOptional } from 'class-validator';

export class UpdateSpecialtyDto {
  @IsString()
  @Length(2, 100)
  @IsOptional()
  specialty_name?: string;
}