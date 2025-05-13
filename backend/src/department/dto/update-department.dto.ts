import { IsString, Length, IsOptional } from 'class-validator';

export class UpdateDepartmentDto {
  @IsString()
  @Length(2, 100)
  @IsOptional()
  department_name?: string;
}