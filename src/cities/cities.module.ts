import { Module } from '@nestjs/common';
import { CitiesController } from './cities.controller';
import { CitiesLibModule } from 'libs/cities-lib';

@Module({
  imports: [CitiesLibModule],
  controllers: [CitiesController],
})
export class CitiesModule {}
