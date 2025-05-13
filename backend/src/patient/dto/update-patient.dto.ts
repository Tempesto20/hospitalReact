import { IsDate, IsString, Length, Matches, IsOptional } from 'class-validator';

export class UpdatePatientDto {
  @IsString()
  @Length(2, 255)
  @IsOptional()
  full_name?: string;

  @IsDate()
  @IsOptional()
  birth_date?: Date;

  @IsString()
  @Length(7, 7)
  @Matches(/^[А-Я]{2}[0-9]{4}[А-Я]$/)
  @IsOptional()
  insurance_policy?: string;

  @IsString()
  @Length(12, 12)
  @Matches(/^[0-9]{2} [0-9]{2} [0-9]{6}$/)
  @IsOptional()
  passport?: string;

  @IsDate()
  @IsOptional()
  admission_date?: Date;

  @IsDate()
  @IsOptional()
  discharge_date?: Date;
}