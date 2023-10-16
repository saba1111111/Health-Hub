import { Module } from '@nestjs/common';
import { DoctorsSuggestionsLibService } from './doctors-suggestions.service';
import { ConsultationsRequestsLibModule } from 'libs/consultations-requests-lib';
import { DoctorsProfilesLibModule } from 'libs/doctors-profiles-lib';
import { PatientHiddenDoctorsLibModule } from 'libs/patient-hidden-doctors-lib';

@Module({
  imports: [
    ConsultationsRequestsLibModule,
    DoctorsProfilesLibModule,
    PatientHiddenDoctorsLibModule,
  ],
  providers: [DoctorsSuggestionsLibService],
  exports: [DoctorsSuggestionsLibService],
})
export class DoctorsSuggestionsLibModule {}
