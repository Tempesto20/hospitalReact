import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Ward } from '../ward/ward.entity';

@Entity()
export class Department {
  static appointment_id(appointment_id: any): Department | PromiseLike<Department> {
    throw new Error('Method not implemented.');
  }
  @PrimaryGeneratedColumn()
  department_id: number;

  @Column({ length: 100, unique: true })
  department_name: string;

  @OneToMany(() => Ward, ward => ward.department)
  wards: Ward[];
}