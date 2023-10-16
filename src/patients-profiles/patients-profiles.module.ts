import { Module } from '@nestjs/common';
import { PatientsProfilesController } from './patients-profiles.controller';
import { PatientsProfilesLibModule } from 'libs/patients-profiles-lib';
import { DoctorsProfilesLibModule } from 'libs/doctors-profiles-lib';

@Module({
  imports: [PatientsProfilesLibModule, DoctorsProfilesLibModule],
  controllers: [PatientsProfilesController],
  exports: [PatientsProfilesLibModule],
})
export class PatientsProfilesModule {}
