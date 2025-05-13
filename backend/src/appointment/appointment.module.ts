import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Appointment } from './appointment.entity';
import { AppointmentService } from './appointment.service';
import { AppointmentController } from './appointment.controller';
import { PatientModule } from '../patient/patient.module';
import { DoctorModule } from '../doctor/doctor.module';
import { WardModule } from '../ward/ward.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Appointment]),
    PatientModule,
    DoctorModule,
    WardModule,
  ],
  providers: [AppointmentService],
  controllers: [AppointmentController],
  exports: [AppointmentService],
})
export class AppointmentModule {}