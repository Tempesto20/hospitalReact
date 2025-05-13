import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Doctor } from '../doctor/doctor.entity';

@Entity()
export class Specialty {
  @PrimaryGeneratedColumn()
  specialty_id: number;

  @Column({ length: 100, unique: true })
  specialty_name: string;

  @OneToMany(() => Doctor, doctor => doctor.specialty)
  doctors: Doctor[];
}