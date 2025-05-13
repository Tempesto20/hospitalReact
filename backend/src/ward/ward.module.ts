import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Ward } from './ward.entity';
import { WardService } from './ward.service';
import { WardController } from './ward.controller';
import { DepartmentModule } from '../department/department.module';
import { DoctorModule } from '../doctor/doctor.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Ward]),
    DepartmentModule,
    DoctorModule,
  ],
  providers: [WardService],
  controllers: [WardController],
  exports: [WardService],
})
export class WardModule {}