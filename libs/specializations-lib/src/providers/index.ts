import { SPECIALIZATIONS_REPOSITORY_TOKEN } from '../constants';
import { SpecializationsTypeormRepository } from '../repositories';

export const SpecializationsDbProviders = [
  {
    provide: SPECIALIZATIONS_REPOSITORY_TOKEN,
    useClass: SpecializationsTypeormRepository,
  },
];
