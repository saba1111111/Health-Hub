import { Module } from '@nestjs/common';
import { PatientHiddenDoctorsController } from './patient-hidden-doctors.controller';
import { PatientHiddenDoctorsLibModule } from 'libs/patient-hidden-doctors-lib';
import { DoctorsProfilesLibModule } from 'libs/doctors-profiles-lib';
import { PatientsProfilesLibModule } from 'libs/patients-profiles-lib';

@Module({
  imports: [
    PatientsProfilesLibModule,
    DoctorsProfilesLibModule,
    PatientHiddenDoctorsLibModule,
  ],
  controllers: [PatientHiddenDoctorsController],
})
export class PatientHiddenDoctorsModule {}
