import { BaseRepository } from 'libs/common-lib';
import { DoctorsProfilesEntity } from '../entities';
import { CreateDoctorsProfileDbDto } from '../dtos';

interface DoctorsProfilesRepositoryExtension {}

type DoctorsProfilesRepository = BaseRepository<
  DoctorsProfilesEntity,
  CreateDoctorsProfileDbDto
> &
  DoctorsProfilesRepositoryExtension;

export { DoctorsProfilesRepository };
