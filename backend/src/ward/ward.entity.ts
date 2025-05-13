import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { Department } from '../department/department.entity';
import { Doctor } from '../doctor/doctor.entity';
import { Appointment } from '../appointment/appointment.entity';

@Entity()
export class Ward {
  @PrimaryGeneratedColumn()
  ward_id: number;

  @Column({ length: 10, unique: true })
  ward_number: string;

  @ManyToOne(() => Department, department => department.wards, { onDelete: 'SET NULL' })
  @JoinColumn({ name: 'department_id' })
  department: Department;

  @ManyToOne(() => Doctor, doctor => doctor.wards, { onDelete: 'SET NULL' })
  @JoinColumn({ name: 'doctor_id' })
  doctor: Doctor;

  @OneToMany(() => Appointment, appointment => appointment.ward)
  appointments: Appointment[];
}