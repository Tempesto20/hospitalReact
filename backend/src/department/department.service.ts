import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Department } from './department.entity';
import { CreateDepartmentDto } from './dto/create-department.dto';
import { UpdateDepartmentDto } from './dto/update-department.dto';

@Injectable()
export class DepartmentService {
  constructor(
    @InjectRepository(Department)
    private departmentRepository: Repository<Department>,
  ) {}

  async findAll(): Promise<Department[]> {
    return this.departmentRepository.find({
      relations: ['wards'],
    });
  }

  async findOne(id: number): Promise<Department> {
    const department = await this.departmentRepository.findOne({
      where: { department_id: id },
      relations: ['wards'],
    });
    if (!department) {
      throw new NotFoundException(`Department with ID ${id} not found`);
    }
    return department;
  }

  async create(createDepartmentDto: CreateDepartmentDto): Promise<Department> {
    const department = this.departmentRepository.create(createDepartmentDto);
    const savedDepartment = await this.departmentRepository.save(department);
    return this.findOne(savedDepartment.department_id);
  }

  async update(id: number, updateDepartmentDto: UpdateDepartmentDto): Promise<Department> {
    await this.departmentRepository.update(id, updateDepartmentDto);
    return this.findOne(id);
  }

  async delete(id: number): Promise<{ message: string }> {
    const department = await this.findOne(id);

    if (department.wards && department.wards.length > 0) {
      throw new ConflictException(
        `Cannot delete department with ID ${id} because it has associated wards. ` +
        `Please reassign or delete those wards first.`,
      );
    }

    await this.departmentRepository.delete(id);
    return { message: `Department with ID ${id} successfully deleted` };
  }
}