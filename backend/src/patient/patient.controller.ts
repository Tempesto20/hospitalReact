import { Controller, Get, Post, Body, Param, Put, Delete, ParseIntPipe, UsePipes, ValidationPipe, HttpCode, HttpStatus } from '@nestjs/common';
import { PatientService } from './patient.service';
import { Patient } from './patient.entity';
import { CreatePatientDto } from './dto/create-patient.dto';
import { UpdatePatientDto } from './dto/update-patient.dto';

@Controller('patients')
@UsePipes(new ValidationPipe())
export class PatientController {
  constructor(private readonly patientService: PatientService) {}

  @Get()
  async findAll(): Promise<Patient[]> {
    return this.patientService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<Patient> {
    return this.patientService.findOne(id);
  }

  @Post()
  async create(@Body() createPatientDto: CreatePatientDto): Promise<Patient> {
    return this.patientService.create(createPatientDto);
  }

  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updatePatientDto: UpdatePatientDto,
  ): Promise<Patient> {
    return this.patientService.update(id, updatePatientDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  async delete(@Param('id', ParseIntPipe) id: number): Promise<{ message: string }> {
    return this.patientService.delete(id);
  }
}