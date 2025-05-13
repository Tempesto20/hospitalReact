import { IsDate, IsOptional, IsString, Length, Matches } from 'class-validator';

export class CreatePatientDto {
  @IsString()
  @Length(2, 255)
  full_name: string;

  @IsDate()
  birth_date: Date;

  @IsString()
  @Length(7, 7)
  @Matches(/^[А-Я]{2}[0-9]{4}[А-Я]$/)
  insurance_policy: string;

  @IsString()
  @Length(12, 12)
  @Matches(/^[0-9]{2} [0-9]{2} [0-9]{6}$/)
  passport: string;

  @IsDate()
  admission_date: Date;

  @IsDate()
  @IsOptional()
  discharge_date?: Date;
}