import { Module } from '@nestjs/common';
import { PatientsProfilesLibService } from './services';
import { PatientsProfilesDbProviders } from './providers';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PatientsProfilesEntity } from './entities';

@Module({
  imports: [TypeOrmModule.forFeature([PatientsProfilesEntity])],
  providers: [PatientsProfilesLibService, ...PatientsProfilesDbProviders],
  exports: [PatientsProfilesLibService],
})
export class PatientsProfilesLibModule {}
