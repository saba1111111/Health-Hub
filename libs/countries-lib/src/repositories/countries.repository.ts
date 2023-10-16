import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CountriesRepository } from '../interfaces';
import { CountriesEntity } from '../entities';
import { BaseRepository } from 'libs/common-lib';
import { CreateCountryDto } from '../dtos';

export class CountriesTypeormRepository
  extends BaseRepository<CountriesEntity, CreateCountryDto>
  implements CountriesRepository
{
  constructor(
    @InjectRepository(CountriesEntity)
    private readonly countriesRepository: Repository<CountriesEntity>,
  ) {
    super(countriesRepository);
  }
}
