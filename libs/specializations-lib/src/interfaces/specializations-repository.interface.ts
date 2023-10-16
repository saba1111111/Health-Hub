import { BaseRepository } from 'libs/common-lib';
import { SpecializationsEntity } from '../entities';
import { CreateSpecializationDto } from '../dtos';

interface SpecializatioRepositoryExtension {}

type SpecializatioRepository = BaseRepository<
  SpecializationsEntity,
  CreateSpecializationDto
> &
  SpecializatioRepositoryExtension;

export { SpecializatioRepository };
