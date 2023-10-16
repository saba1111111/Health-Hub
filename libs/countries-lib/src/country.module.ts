import { Module } from '@nestjs/common';
import { CountriesDbProviders } from './providers';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CountriesEntity } from './entities';
import { CountriesService } from './services';

@Module({
  imports: [TypeOrmModule.forFeature([CountriesEntity])],
  providers: [CountriesService, ...CountriesDbProviders],
  exports: [CountriesService],
})
export class CountriesLibModule {}
