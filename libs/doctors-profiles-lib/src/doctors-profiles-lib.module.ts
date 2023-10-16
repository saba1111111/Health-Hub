import { Module } from '@nestjs/common';
import { DoctorsProfilesLibService } from './services';
import { DoctorsProfilesDbProviders } from './providers';
import { CitiesLibModule } from 'libs/cities-lib/cities.module';
import { SpecializationsLibModule } from 'libs/specializations-lib';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DoctorsProfilesEntity } from './entities';

@Module({
  imports: [
    CitiesLibModule,
    SpecializationsLibModule,
    TypeOrmModule.forFeature([DoctorsProfilesEntity]),
  ],
  providers: [DoctorsProfilesLibService, ...DoctorsProfilesDbProviders],
  exports: [DoctorsProfilesLibService],
})
export class DoctorsProfilesLibModule {}
