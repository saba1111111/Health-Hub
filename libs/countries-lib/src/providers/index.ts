import { COUNTRIES_REPOSITORY_TOKEN } from '../constants';
import { CountriesTypeormRepository } from '../repositories';

export const CountriesDbProviders = [
  {
    provide: COUNTRIES_REPOSITORY_TOKEN,
    useClass: CountriesTypeormRepository,
  },
];
