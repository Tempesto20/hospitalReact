import { IsInt, IsDate, IsOptional, IsString } from 'class-validator';

export class UpdateAppointmentDto {
  @IsInt()
  @IsOptional()
  patient_id?: number;

  @IsInt()
  @IsOptional()
  doctor_id?: number;

  @IsInt()
  @IsOptional()
  ward_id?: number;

  @IsDate()
  @IsOptional()
  appointment_date?: Date;

  @IsString()
  @IsOptional()
  symptom?: string;

  @IsString()
  @IsOptional()
  diagnos?: string;

  @IsString()
  @IsOptional()
  allergy?: string;

  @IsString()
  @IsOptional()
  preparation?: string;
}