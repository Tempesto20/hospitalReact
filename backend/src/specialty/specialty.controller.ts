import { Controller, Get, Post, Body, Param, Put, Delete, UsePipes, ValidationPipe, ParseIntPipe, HttpCode, HttpStatus } from '@nestjs/common';
import { SpecialtyService } from './specialty.service';
import { Specialty } from './specialty.entity';
import { CreateSpecialtyDto } from './dto/create-specialty.dto';
import { UpdateSpecialtyDto } from './dto/update-specialty.dto';

@Controller('specialties')
@UsePipes(new ValidationPipe())
export class SpecialtyController {
  constructor(private readonly specialtyService: SpecialtyService) {}

  @Get()
  async findAll(): Promise<Specialty[]> {
    return this.specialtyService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Specialty> {
    return this.specialtyService.findOne(id);
  }

  @Post()
  async create(@Body() createSpecialtyDto: CreateSpecialtyDto): Promise<Specialty> {
    return this.specialtyService.create(createSpecialtyDto);
  }

  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateSpecialtyDto: UpdateSpecialtyDto,
  ): Promise<Specialty> {
    return this.specialtyService.update(id, updateSpecialtyDto);
  }


  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  async delete(@Param('id') id: number): Promise<{ message: string }> {
    return this.specialtyService.delete(id);
  }
}