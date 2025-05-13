import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Specialty } from './specialty.entity';
import { CreateSpecialtyDto } from './dto/create-specialty.dto';
import { UpdateSpecialtyDto } from './dto/update-specialty.dto';
import { Doctor } from 'src/doctor/doctor.entity';

@Injectable()
export class SpecialtyService {
  doctorRepository: any;
  constructor(
    @InjectRepository(Specialty)
    private specialtyRepository: Repository<Specialty>,
  ) {}

  async findAll(): Promise<Specialty[]> {
    return this.specialtyRepository.find({
      relations: ['doctors'],
    });
  }

  async findOne(id: number): Promise<Specialty> {
    const specialty = await this.specialtyRepository.findOne({
      where: { specialty_id: id },
      relations: ['doctors'],
    });
    if (!specialty) {
      throw new NotFoundException(`Specialty with ID ${id} not found`);
    }
    return specialty;
  }

  async create(createSpecialtyDto: CreateSpecialtyDto): Promise<Specialty> {
    const specialty = this.specialtyRepository.create(createSpecialtyDto);
    const savedSpecialty = await this.specialtyRepository.save(specialty);
    return this.findOne(savedSpecialty.specialty_id);
  }

  async update(id: number, updateSpecialtyDto: UpdateSpecialtyDto): Promise<Specialty> {
    await this.specialtyRepository.update(id, updateSpecialtyDto);
    return this.findOne(id);
  }

  async delete(id: number): Promise<{ message: string }> {
    const specialty = await this.findOne(id);

    // Обнуляем специальность у врачей
    if (specialty.doctors && specialty.doctors.length > 0) {
      await this.doctorRepository
        .createQueryBuilder()
        .update(Doctor)
        .set({ specialty: null })
        .where('specialty_id = :id', { id })
        .execute();
    }

    await this.specialtyRepository.delete(id);
    return { message: `Specialty with ID ${id} successfully deleted` };
  }
}