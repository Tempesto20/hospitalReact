import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Appointment } from './appointment.entity';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { UpdateAppointmentDto } from './dto/update-appointment.dto';

@Injectable()
export class AppointmentService {
  constructor(
    @InjectRepository(Appointment)
    private appointmentRepository: Repository<Appointment>,
  ) {}

  async findAll(): Promise<Appointment[]> {
    return this.appointmentRepository.find({
      relations: ['patient', 'doctor', 'ward'],
    });
  }

  async findOne(id: number): Promise<Appointment> {
    const appointment = await this.appointmentRepository.findOne({
      where: { appointment_id: id },
      relations: ['patient', 'doctor', 'ward'],
    });
    if (!appointment) {
      throw new NotFoundException(`Appointment with ID ${id} not found`);
    }
    return appointment;
  }

  async create(createAppointmentDto: CreateAppointmentDto): Promise<Appointment> {
    const appointment = this.appointmentRepository.create(createAppointmentDto);
    const savedAppointment = await this.appointmentRepository.save(appointment);
    return this.findOne(savedAppointment.appointment_id);
  }

  async update(id: number, updateAppointmentDto: UpdateAppointmentDto): Promise<Appointment> {
    await this.appointmentRepository.update(id, updateAppointmentDto);
    return this.findOne(id);
  }

  async delete(id: number): Promise<{ message: string }> {
    const appointment = await this.findOne(id);
    
    try {
      await this.appointmentRepository.remove(appointment);
      return { message: `Appointment with ID ${id} successfully deleted` };
    } catch (error) {
      throw new NotFoundException(
        `Failed to delete appointment with ID ${id}: ${error.message}`,
      );
    }
  }
}