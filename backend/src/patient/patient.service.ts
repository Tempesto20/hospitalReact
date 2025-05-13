import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Patient } from './patient.entity';
import { CreatePatientDto } from './dto/create-patient.dto';
import { UpdatePatientDto } from './dto/update-patient.dto';

@Injectable()
export class PatientService {
  constructor(
    @InjectRepository(Patient)
    private patientRepository: Repository<Patient>,
  ) {}

  async findAll(): Promise<Patient[]> {
    return this.patientRepository.find({
      relations: ['appointments'],
    });
  }

  async findOne(id: number): Promise<Patient> {
    const patient = await this.patientRepository.findOne({
      where: { patient_id: id },
      relations: ['appointments'],
    });
    if (!patient) {
      throw new NotFoundException(`Patient with ID ${id} not found`);
    }
    return patient;
  }

  async create(createPatientDto: CreatePatientDto): Promise<Patient> {
    const patient = this.patientRepository.create(createPatientDto);
    const savedPatient = await this.patientRepository.save(patient);
    return this.findOne(savedPatient.patient_id);
  }

  async update(id: number, updatePatientDto: UpdatePatientDto): Promise<Patient> {
    await this.patientRepository.update(id, updatePatientDto);
    return this.findOne(id);
  }

  async delete(id: number): Promise<{ message: string }> {
    const patient = await this.findOne(id);

    // Каскадное удаление приемов пациента
    if (patient.appointments && patient.appointments.length > 0) {
      await this.patientRepository
        .createQueryBuilder()
        .delete()
        .where('patient_id = :id', { id })
        .execute();
    }

    await this.patientRepository.delete(id);
    return { message: `Patient with ID ${id} successfully deleted` };
  }
}