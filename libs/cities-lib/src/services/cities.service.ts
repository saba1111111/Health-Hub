import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CITIES_REPOSITORY_TOKEN } from '../constants';
import { CitiesRepository } from '../interfaces';
import { CitiesEntity } from '../entities';
import { CountriesService } from 'libs/countries-lib';
import { CreateCityDto } from '../dtos';

@Injectable()
export class CitiesLibService {
  constructor(
    @Inject(CITIES_REPOSITORY_TOKEN)
    private readonly citiesRepository: CitiesRepository,
    private readonly countriesService: CountriesService,
  ) {}

  public async findCity(findOptions: Partial<CitiesEntity>) {
    try {
      const city = await this.citiesRepository.findOne(findOptions);
      if (!city) {
        throw new NotFoundException('No such city!');
      }

      return {
        success: true,
        message: 'successfully find city!',
        data: { city },
      };
    } catch (error) {
      throw new NotFoundException(error.message || 'No such city!');
    }
  }

  public async findAll() {
    try {
      const cities = await this.citiesRepository.findAll();

      return {
        success: true,
        message: 'successfully find cities!',
        data: { cities },
      };
    } catch (error) {
      const message = error.message || 'Cities are not avaliable!';
      throw new NotFoundException(message);
    }
  }

  public async createCity(credentials: CreateCityDto) {
    try {
      await this.countriesService.checkCountryExistence(credentials.countryId);

      const cityExistenceStatus = Boolean(
        await this.citiesRepository.findOne({
          name: credentials.name,
          countryId: credentials.countryId,
        }),
      );
      if (cityExistenceStatus) {
        throw new BadRequestException(
          `City ${credentials.name} already exists!`,
        );
      }

      const city = await this.citiesRepository.create(credentials);

      return {
        success: true,
        message: 'successfully create city!',
        data: { city },
      };
    } catch (error) {
      const message = error.message || 'Failed creating city!';
      throw new BadRequestException(message);
    }
  }

  public async updateCity(
    cityId: number,
    updateObject: Partial<CreateCityDto>,
  ) {
    try {
      await this.checkCityExistenceStatus(cityId);

      await this.citiesRepository.updateById(cityId, updateObject);

      return {
        success: true,
        message: 'successfully update city!',
      };
    } catch (error) {
      const message = error.message || 'Failed updating city!';
      throw new BadRequestException(message);
    }
  }

  public async checkCityExistenceStatus(id: number) {
    const cityExistenceStatus = Boolean(
      await this.citiesRepository.findOne({ id }),
    );
    if (!cityExistenceStatus) {
      throw new NotFoundException('No such city!');
    }

    return true;
  }

  public async findCites(cityIds: Array<number>): Promise<CitiesEntity[]> {
    const cities = [];

    for (const cityId of cityIds) {
      const city = await this.citiesRepository.findOne({
        id: cityId,
      });

      if (!city) {
        throw new NotFoundException(`City with id ${cityId} does not exist!`);
      }

      cities.push(city);
    }

    return cities;
  }
}
