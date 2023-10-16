import { DOCTORS_PROFILES_DB_TOKEN } from '../constants';
import { DoctorsProfilesTypeormRepository } from '../repositories/doctors-profiles.repository';

export const DoctorsProfilesDbProviders = [
  {
    provide: DOCTORS_PROFILES_DB_TOKEN,
    useClass: DoctorsProfilesTypeormRepository,
  },
];
