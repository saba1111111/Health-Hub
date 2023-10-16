import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CitiesRepository } from '../interfaces';
import { CitiesEntity } from '../entities';
import { BaseRepository } from 'libs/common-lib';
import { CreateCityDto } from '../dtos';

export class CitiesTypeormRepository
  extends BaseRepository<CitiesEntity, CreateCityDto>
  implements CitiesRepository
{
  constructor(
    @InjectRepository(CitiesEntity)
    private readonly citiesRepository: Repository<CitiesEntity>,
  ) {
    super(citiesRepository);
  }
}
