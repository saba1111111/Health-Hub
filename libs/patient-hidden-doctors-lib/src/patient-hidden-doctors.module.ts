import { Module } from '@nestjs/common';
import { PatientsHiddenDoctorsDbProviders } from './providers';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PatientsHiddenDoctorsEntity } from './entities/patient-hidden-doctors.entity';
import { PatientHiddenDoctorsLibService } from './services/patient-hidden-doctors.service';
import { UsersModule } from 'libs/users-lib';

@Module({
  imports: [
    TypeOrmModule.forFeature([PatientsHiddenDoctorsEntity]),
    UsersModule,
  ],
  providers: [
    PatientHiddenDoctorsLibService,
    ...PatientsHiddenDoctorsDbProviders,
  ],
  exports: [PatientHiddenDoctorsLibService],
})
export class PatientHiddenDoctorsLibModule {}
