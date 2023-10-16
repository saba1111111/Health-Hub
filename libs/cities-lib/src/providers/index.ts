import { CITIES_REPOSITORY_TOKEN } from '../constants';
import { CitiesTypeormRepository } from '../repositories';

export const CitiesDbProviders = [
  {
    provide: CITIES_REPOSITORY_TOKEN,
    useClass: CitiesTypeormRepository,
  },
];
