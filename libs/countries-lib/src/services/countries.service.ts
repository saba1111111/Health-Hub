import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CountriesRepository } from '../interfaces';
import { COUNTRIES_REPOSITORY_TOKEN } from '../constants';
import { CountriesEntity } from '../entities';
import { CreateCountryDto } from '../dtos';

@Injectable()
export class CountriesService {
  constructor(
    @Inject(COUNTRIES_REPOSITORY_TOKEN)
    private readonly countriesRepository: CountriesRepository,
  ) {}

  public async findCountry(findOptions: Partial<CountriesEntity>) {
    try {
      const countrie = await this.countriesRepository.findOne(findOptions);
      if (!countrie) {
        throw new NotFoundException('No such Country!');
      }

      return countrie;
    } catch (error) {
      throw new NotFoundException(error.message || 'No such Country!');
    }
  }

  public async findAll() {
    try {
      const countries = await this.countriesRepository.findAll();

      return countries;
    } catch (error) {
      const message = error.message || 'Coountries are not avaliable!';
      throw new NotFoundException(message);
    }
  }

  public async createCountry(credentials: CreateCountryDto) {
    try {
      const countryExistenceStatus = Boolean(
        await this.countriesRepository.findOne({ name: credentials.name }),
      );
      if (countryExistenceStatus) {
        throw new BadRequestException(
          `Country ${credentials.name} already exists!`,
        );
      }

      const country = await this.countriesRepository.create(credentials);

      return {
        success: true,
        message: 'successfully create country!',
        data: { country },
      };
    } catch (error) {
      const message = error.message || 'Failed creating contry!';
      throw new BadRequestException(message);
    }
  }

  public async updateCountry(
    countryId: number,
    updateObject: Partial<CreateCountryDto>,
  ) {
    try {
      await this.checkCountryExistence(countryId);

      await this.countriesRepository.updateById(countryId, updateObject);

      return {
        success: true,
        message: 'successfully update country!',
      };
    } catch (error) {
      const message = error.message || 'Failed updating contry!';
      throw new BadRequestException(message);
    }
  }

  public async checkCountryExistence(countryId: number) {
    const country = Boolean(await this.findCountry({ id: countryId }));
    if (!country) {
      throw new NotFoundException('No such Country!');
    }
  }
}
