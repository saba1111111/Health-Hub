import { InjectRepository } from '@nestjs/typeorm';
import { DoctorsProfilesRepository } from '../interfaces';
import { DoctorsProfilesEntity } from '../entities';
import { Repository } from 'typeorm';
import { BaseRepository } from 'libs/common-lib';
import { CreateDoctorsProfileDbDto } from '../dtos';

export class DoctorsProfilesTypeormRepository
  extends BaseRepository<DoctorsProfilesEntity, CreateDoctorsProfileDbDto>
  implements DoctorsProfilesRepository
{
  constructor(
    @InjectRepository(DoctorsProfilesEntity)
    private readonly doctorsRepository: Repository<DoctorsProfilesEntity>,
  ) {
    super(doctorsRepository);
  }
}
