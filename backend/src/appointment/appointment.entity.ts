import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Patient } from '../patient/patient.entity';
import { Doctor } from '../doctor/doctor.entity';
import { Ward } from '../ward/ward.entity';

@Entity()
export class Appointment {
  @PrimaryGeneratedColumn()
  appointment_id: number;

  @ManyToOne(() => Patient, patient => patient.appointments, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'patient_id' })
  patient: Patient;

  @ManyToOne(() => Doctor, doctor => doctor.appointments, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'doctor_id' })
  doctor: Doctor;

  @ManyToOne(() => Ward, ward => ward.appointments, { onDelete: 'SET NULL' })
  @JoinColumn({ name: 'ward_id' })
  ward: Ward;

  @Column('date')
  appointment_date: Date;

  @Column('text', { nullable: true })
  symptom: string;

  @Column('text', { nullable: true })
  diagnos: string;

  @Column('text', { nullable: true })
  allergy: string;

  @Column('text', { nullable: true })
  preparation: string;
}