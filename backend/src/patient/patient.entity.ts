import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Appointment } from '../appointment/appointment.entity';

@Entity()
export class Patient {
  @PrimaryGeneratedColumn()
  patient_id: number;

  @Column({ length: 255 })
  full_name: string;

  @Column('date')
  birth_date: Date;

  @Column({ length: 10, unique: true })
  insurance_policy: string;

  @Column({ length: 30, unique: true })
  passport: string;

  @Column('date')
  admission_date: Date;

  @Column('date', { nullable: true })
  discharge_date: Date;

  @OneToMany(() => Appointment, appointment => appointment.patient)
  appointments: Appointment[];
}