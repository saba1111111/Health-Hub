import { BaseRepository } from 'libs/common-lib';
import { CountriesEntity } from '../entities';
import { CreateCountryDto } from '../dtos';

interface CountriesRepositoryExtension {}

type CountriesRepository = BaseRepository<CountriesEntity, CreateCountryDto> &
  CountriesRepositoryExtension;

export { CountriesRepository };
