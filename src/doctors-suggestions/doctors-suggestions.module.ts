import { Module } from '@nestjs/common';
import { DoctorsSuggestionsController } from './doctors-suggestions.controller';
import { DoctorsSuggestionsLibModule } from 'libs/doctors-suggestions-lib';
import { CacheModule } from 'libs/cache-lib';
import { DoctorsProfilesLibModule } from 'libs/doctors-profiles-lib';
import { PatientsProfilesLibModule } from 'libs/patients-profiles-lib';

@Module({
  imports: [
    DoctorsSuggestionsLibModule,
    CacheModule,
    PatientsProfilesLibModule,
    DoctorsProfilesLibModule,
  ],
  controllers: [DoctorsSuggestionsController],
})
export class DoctorsSuggestionsModule {}
