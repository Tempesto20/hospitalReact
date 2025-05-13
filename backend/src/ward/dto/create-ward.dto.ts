import { IsInt, IsOptional, IsString, Length } from 'class-validator';

export class CreateWardDto {
  @IsString()
  @Length(1, 10)
  ward_number: string;

  @IsInt()
  department_id: number;

  @IsInt()
  @IsOptional()
  doctor_id?: number;
}