import { PATIENTS_PROFILES_DB_TOKEN } from '../constants';
import { PatientsProfilesTypeormRepository } from '../repositories';

export const PatientsProfilesDbProviders = [
  {
    provide: PATIENTS_PROFILES_DB_TOKEN,
    useClass: PatientsProfilesTypeormRepository,
  },
];
