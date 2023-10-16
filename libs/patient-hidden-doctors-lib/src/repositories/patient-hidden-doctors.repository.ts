import { BaseRepository } from 'libs/common-lib';
import { PatientsHiddenDoctorsEntity } from '../entities';
import {
  CreatePatientHiddenDoctor,
  PatientsHiddenDoctorsRepository,
} from '../interfaces';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

export class PatientHiddenDoctorsTypeormRepository
  extends BaseRepository<PatientsHiddenDoctorsEntity, CreatePatientHiddenDoctor>
  implements PatientsHiddenDoctorsRepository
{
  constructor(
    @InjectRepository(PatientsHiddenDoctorsEntity)
    private readonly doctorsRepository: Repository<PatientsHiddenDoctorsEntity>,
  ) {
    super(doctorsRepository);
  }
}
