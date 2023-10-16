import { Module } from '@nestjs/common';
import { DoctorsProfilesController } from './doctors-profiles.controller';
import { DoctorsProfilesLibModule } from 'libs/doctors-profiles-lib';
import { ProfileGuard } from 'libs/auth-lib';
import { PatientsProfilesLibModule } from 'libs/patients-profiles-lib';

@Module({
  imports: [DoctorsProfilesLibModule, PatientsProfilesLibModule],
  controllers: [DoctorsProfilesController],
  exports: [DoctorsProfilesLibModule],
})
export class DoctorsProfilesModule {}
