import { IsInt, IsString, Length, IsOptional } from 'class-validator';

export class UpdateDoctorDto {
  @IsString()
  @Length(2, 255)
  @IsOptional()
  full_name?: string;

  @IsInt()
  @IsOptional()
  specialty_id?: number;
}