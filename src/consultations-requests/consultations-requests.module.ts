import { Module } from '@nestjs/common';
import { ConsultationsRequestsController } from './consultations-requests.controller';
import { ConsultationsRequestsLibModule } from 'libs/consultations-requests-lib';
import { PatientsProfilesLibModule } from 'libs/patients-profiles-lib';
import { DoctorsProfilesLibModule } from 'libs/doctors-profiles-lib';

@Module({
  imports: [
    ConsultationsRequestsLibModule,
    PatientsProfilesLibModule,
    DoctorsProfilesLibModule,
  ],
  controllers: [ConsultationsRequestsController],
})
export class ConsultationsRequestsModule {}
