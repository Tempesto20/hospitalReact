import { IsString, Length } from 'class-validator';

export class CreateSpecialtyDto {
  @IsString()
  @Length(2, 100)
  specialty_name: string;
}