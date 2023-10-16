import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SpecializatioRepository } from '../interfaces';
import { SpecializationsEntity } from '../entities';
import { BaseRepository } from 'libs/common-lib';
import { CreateSpecializationDto } from '../dtos';

export class SpecializationsTypeormRepository
  extends BaseRepository<SpecializationsEntity, CreateSpecializationDto>
  implements SpecializatioRepository
{
  constructor(
    @InjectRepository(SpecializationsEntity)
    private readonly specializationRepository: Repository<SpecializationsEntity>,
  ) {
    super(specializationRepository);
  }
}
