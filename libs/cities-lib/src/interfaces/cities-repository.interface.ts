import { BaseRepository } from 'libs/common-lib';
import { CitiesEntity } from '../entities';
import { CreateCityDto } from '../dtos';

interface CitiesRepositoryExtension {}

type CitiesRepository = BaseRepository<CitiesEntity, CreateCityDto> &
  CitiesRepositoryExtension;

export { CitiesRepository };
