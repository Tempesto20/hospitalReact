import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Ward } from './ward.entity';
import { CreateWardDto } from './dto/create-ward.dto';
import { UpdateWardDto } from './dto/update-ward.dto';

@Injectable()
export class WardService {
  constructor(
    @InjectRepository(Ward)
    private wardRepository: Repository<Ward>,
  ) {}

  async findAll(): Promise<Ward[]> {
    return this.wardRepository.find({
      relations: ['department', 'doctor', 'appointments'],
    });
  }

  async findOne(id: number): Promise<Ward> {
    const ward = await this.wardRepository.findOne({
      where: { ward_id: id },
      relations: ['department', 'doctor', 'appointments'],
    });
    if (!ward) {
      throw new NotFoundException(`Ward with ID ${id} not found`);
    }
    return ward;
  }

  async create(createWardDto: CreateWardDto): Promise<Ward> {
    const ward = this.wardRepository.create(createWardDto);
    const savedWard = await this.wardRepository.save(ward);
    return this.findOne(savedWard.ward_id);
  }

  async update(id: number, updateWardDto: UpdateWardDto): Promise<Ward> {
    await this.wardRepository.update(id, updateWardDto);
    return this.findOne(id);
  }

  async delete(id: number): Promise<{ message: string }> {
    const ward = await this.findOne(id);

    if (ward.appointments && ward.appointments.length > 0) {
      throw new ConflictException(
        `Cannot delete ward with ID ${id} because it has associated appointments. ` +
        `Please reassign or delete those appointments first.`,
      );
    }

    await this.wardRepository.delete(id);
    return { message: `Ward with ID ${id} successfully deleted` };
  }
}