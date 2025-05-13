import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Doctor } from './doctor.entity';
import { DoctorService } from './doctor.service';
import { DoctorController } from './doctor.controller';
import { SpecialtyModule } from '../specialty/specialty.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Doctor]),
    SpecialtyModule,
  ],
  providers: [DoctorService],
  controllers: [DoctorController],
  exports: [DoctorService],
})
export class DoctorModule {}