import { IsInt, IsString, Length, IsOptional } from 'class-validator';

export class UpdateWardDto {
  @IsString()
  @Length(1, 10)
  @IsOptional()
  ward_number?: string;

  @IsInt()
  @IsOptional()
  department_id?: number;

  @IsInt()
  @IsOptional()
  doctor_id?: number;
}