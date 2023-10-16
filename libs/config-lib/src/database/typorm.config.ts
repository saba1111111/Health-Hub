import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { config as dotenvConfig } from 'dotenv';
import { UsersEntity } from 'libs/users-lib';
import { CitiesEntity } from 'libs/cities-lib';
import { DoctorsProfilesEntity } from 'libs/doctors-profiles-lib';
import { PatientsProfilesEntity } from 'libs/patients-profiles-lib/entities';
import { RefreshTokensEntity } from 'libs/auth-lib';
import { SpecializationsEntity } from 'libs/specializations-lib';
import { ConsultationsRequestsEntity } from 'libs/consultations-requests-lib';
import { CountriesEntity } from 'libs/countries-lib';
import { Config } from './database.config';
import { PatientsHiddenDoctorsEntity } from 'libs/patient-hidden-doctors-lib';

dotenvConfig({ path: '.env' });

export const DatabaseConfig: TypeOrmModuleOptions = {
  ...Config,
  entities: [
    UsersEntity,
    CitiesEntity,
    DoctorsProfilesEntity,
    PatientsProfilesEntity,
    RefreshTokensEntity,
    SpecializationsEntity,
    UsersEntity,
    ConsultationsRequestsEntity,
    CountriesEntity,
    PatientsHiddenDoctorsEntity,
  ],
  synchronize: true,
};
