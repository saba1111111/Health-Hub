import { InjectRepository } from '@nestjs/typeorm';
import { PatientsProfilesEntity } from '../entities';
import { Repository } from 'typeorm';
import {
  CreatePatientsProfile,
  PatientsProfilesRepository,
} from '../interfaces';
import { BaseRepository } from 'libs/common-lib';

export class PatientsProfilesTypeormRepository
  extends BaseRepository<PatientsProfilesEntity, CreatePatientsProfile>
  implements PatientsProfilesRepository
{
  constructor(
    @InjectRepository(PatientsProfilesEntity)
    private readonly patientsRepository: Repository<PatientsProfilesEntity>,
  ) {
    super(patientsRepository);
  }
}
