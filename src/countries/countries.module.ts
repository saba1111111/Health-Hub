import { Module } from '@nestjs/common';
import { CountriesController } from './countries.controller';
import { CountriesLibModule } from 'libs/countries-lib';

@Module({
  imports: [CountriesLibModule],
  controllers: [CountriesController],
})
export class CountriesModule {}
