import { Module } from '@nestjs/common';
import { CitiesDbProviders } from './providers';
import { CitiesLibService } from './services';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CitiesEntity } from './entities';
import { CountriesLibModule } from 'libs/countries-lib';

@Module({
  imports: [TypeOrmModule.forFeature([CitiesEntity]), CountriesLibModule],
  providers: [CitiesLibService, ...CitiesDbProviders],
  exports: [CitiesLibService],
})
export class CitiesLibModule {}
