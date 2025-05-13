import { IsInt, IsString, Length } from 'class-validator';

export class CreateDoctorDto {
  @IsString()
  @Length(2, 255)
  full_name: string;

  @IsInt()
  specialty_id: number;
}