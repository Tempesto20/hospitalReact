import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SpecialtyModule } from './specialty/specialty.module';
import { DoctorModule } from './doctor/doctor.module';
import { PatientModule } from './patient/patient.module';
import { DepartmentModule } from './department/department.module';
import { WardModule } from './ward/ward.module';
import { AppointmentModule } from './appointment/appointment.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '1',
      database: 'hospital',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
      logging: true,
    }),
    SpecialtyModule,
    DoctorModule,
    PatientModule,
    DepartmentModule,
    WardModule,
    AppointmentModule,
  ],
})
export class AppModule {}