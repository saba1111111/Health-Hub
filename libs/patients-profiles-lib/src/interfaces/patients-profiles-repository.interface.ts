import { BaseRepository } from 'libs/common-lib';
import { CreatePatientsProfileDb } from './create-patient-profile.interface';
import { PatientsProfilesEntity } from '../entities';

interface PatientsProfilesRepositoryExtension {}

type PatientsProfilesRepository = BaseRepository<
  PatientsProfilesEntity,
  CreatePatientsProfileDb
> &
  PatientsProfilesRepositoryExtension;

export { PatientsProfilesRepository };
