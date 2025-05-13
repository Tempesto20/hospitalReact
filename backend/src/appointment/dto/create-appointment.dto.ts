import { IsInt, IsDate, IsOptional, IsString } from 'class-validator';

export class CreateAppointmentDto {
  @IsInt()
  patient_id: number;

  @IsInt()
  doctor_id: number;

  @IsInt()
  @IsOptional()
  ward_id?: number;

  @IsDate()
  appointment_date: Date;

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