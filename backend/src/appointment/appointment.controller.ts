import { Controller, Get, Post, Body, Param, Put, Delete, ParseIntPipe, UsePipes, ValidationPipe, HttpCode, HttpStatus  } from '@nestjs/common';
import { AppointmentService } from './appointment.service';
import { Appointment } from './appointment.entity';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { UpdateAppointmentDto } from './dto/update-appointment.dto';

@Controller('appointments')
@UsePipes(new ValidationPipe())
export class AppointmentController {
  constructor(private readonly appointmentService: AppointmentService) {}

  @Get()
  async findAll(): Promise<Appointment[]> {
    return this.appointmentService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<Appointment> {
    return this.appointmentService.findOne(id);
  }

  @Post()
  async create(@Body() createAppointmentDto: CreateAppointmentDto): Promise<Appointment> {
    return this.appointmentService.create(createAppointmentDto);
  }

  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateAppointmentDto: UpdateAppointmentDto,
  ): Promise<Appointment> {
    return this.appointmentService.update(id, updateAppointmentDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  async delete(@Param('id', ParseIntPipe) id: number): Promise<{ message: string }> {
    return this.appointmentService.delete(id);
  }
}