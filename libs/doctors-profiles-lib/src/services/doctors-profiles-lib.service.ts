import {
  BadRequestException,
  ConflictException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { DOCTORS_PROFILES_DB_TOKEN } from '../constants';
import {
  DoctorsFindOptions,
  DoctorsProfilesRepository,
  GenerateMatchProfilesCredentials,
  RangeFilterCredentials,
} from '../interfaces';
import { SpecializationsLibService } from 'libs/specializations-lib';
import { CitiesLibService } from 'libs/cities-lib/services/cities.service';
import { TABLES, UserRequest } from 'libs/common-lib';
import { UsersEntity } from 'libs/users-lib';
import { CreateDoctorsProfileDto, UpdateDoctorProfileDto } from '../dtos';
import { DataSource } from 'typeorm';
import { DoctorsProfilesEntity } from '../entities';

@Injectable()
export class DoctorsProfilesLibService {
  constructor(
    @Inject(DOCTORS_PROFILES_DB_TOKEN)
    private readonly doctorsProfilesRepository: DoctorsProfilesRepository,
    private readonly citiesService: CitiesLibService,
    private readonly specializationesService: SpecializationsLibService,
    private readonly dataSource: DataSource,
  ) {}

  public async findProfile(findOptions: Partial<DoctorsFindOptions>) {
    try {
      const profile = await this.doctorsProfilesRepository.findOne(findOptions);
      if (!profile) {
        throw new NotFoundException('No such profile!');
      }

      return profile;
    } catch (error) {
      throw new NotFoundException(error.message || 'No such profile!');
    }
  }

  public async findAllProfiles() {
    try {
      const profiles = await this.doctorsProfilesRepository.findAll();

      return {
        success: true,
        message: 'successfully find profiles!',
        data: { profiles },
      };
    } catch (error) {
      const message = error.message || 'Profiles are not avaliable!';
      throw new NotFoundException(message);
    }
  }

  public async createProfile(
    { user }: UserRequest<UsersEntity>,
    credentials: CreateDoctorsProfileDto,
  ) {
    try {
      const checkProfileExistence = Boolean(
        await this.doctorsProfilesRepository.findOne({ doctorId: user.id }),
      );
      if (checkProfileExistence) {
        throw new ConflictException('You already have a profile as a doctor!');
      }

      await this.citiesService.checkCityExistenceStatus(credentials.cityId);
      await this.specializationesService.checkSpecializationExistenceStatus(
        credentials.specializationId,
      );

      const profile = await this.doctorsProfilesRepository.create({
        ...credentials,
        doctorId: user.id,
      });

      return {
        success: true,
        message: 'successfully create profile!',
        data: { profile },
      };
    } catch (error) {
      const message = error.message || 'Failed creating profile!';
      throw new BadRequestException(message);
    }
  }

  public async updateProfile(
    { user }: UserRequest<UsersEntity>,
    updateObject: UpdateDoctorProfileDto,
  ) {
    try {
      const profile = await this.findProfile({ doctorId: user.id });

      if (updateObject.cityId) {
        await this.citiesService.checkCityExistenceStatus(updateObject.cityId);
      }
      if (updateObject.specializationId) {
        await this.specializationesService.checkSpecializationExistenceStatus(
          updateObject.specializationId,
        );
      }

      await this.doctorsProfilesRepository.updateById(profile.id, updateObject);

      return {
        success: true,
        message: 'successfully update profile!',
      };
    } catch (error) {
      const message = error.message || 'Failed updating profile!';
      throw new BadRequestException(message);
    }
  }

  public async checkProfileExistenceStatus(doctorId: number) {
    const profileExistenceStatus = Boolean(
      await this.doctorsProfilesRepository.findOne({ doctorId }),
    );

    if (!profileExistenceStatus) {
      throw new BadRequestException(
        'You dont have a profile, So, you can not access anything. First go and create profile!',
      );
    }
  }

  public async generateMatchProfiles(
    credentials: GenerateMatchProfilesCredentials,
  ) {
    const table = TABLES.DOCTORS_PROFILES_TABLE;

    const doctorsProfilesQueryBuilder =
      this.dataSource.manager.createQueryBuilder(DoctorsProfilesEntity, table);

    if (credentials.gender) {
      doctorsProfilesQueryBuilder.andWhere(`${table}.gender = :gender`, {
        gender: credentials.gender,
      });
    }

    if (credentials.minAge) {
      const minDateOfBirth = await this.turnAgeToDateOfBirth(
        credentials.minAge,
      );
      doctorsProfilesQueryBuilder.andWhere(
        `${table}.dateOfBirth <= :minDateOfBirth`,
        { minDateOfBirth },
      );
    }

    if (credentials.maxAge) {
      const maxDateOfBirth = await this.turnAgeToDateOfBirth(
        credentials.maxAge,
      );
      doctorsProfilesQueryBuilder.andWhere(
        `${table}.dateOfBirth >= :maxDateOfBirth`,
        { maxDateOfBirth },
      );
    }

    await this.addRangeFilter({
      table,
      column: 'experienceInYears',
      maxValue: credentials.maxExperience,
      minValue: credentials.minExperience,
      queryBuilder: doctorsProfilesQueryBuilder,
    });

    this.addRangeFilter({
      table,
      column: 'ratePerHour',
      maxValue: credentials.maxRatePerHour,
      minValue: credentials.minRatePerHour,
      queryBuilder: doctorsProfilesQueryBuilder,
    });

    if (credentials.cities) {
      const cities = credentials.cities.map((city) => city.id);
      doctorsProfilesQueryBuilder.andWhere(`${table}.cityId IN (:...cities)`, {
        cities,
      });
    }

    if (credentials.specializations) {
      const specializations = credentials.specializations.map(
        (specialization) => specialization.id,
      );

      doctorsProfilesQueryBuilder.andWhere(
        `${table}.specializationId IN (:...specializations)`,
        { specializations },
      );
    }

    doctorsProfilesQueryBuilder
      .orderBy(`${table}.experienceInYears`, 'DESC') // we dont have doctors rating, but Here our rating is doctors experience.
      .limit(10);

    return doctorsProfilesQueryBuilder.getMany();
  }

  public async addRangeFilter(credentials: RangeFilterCredentials) {
    const { queryBuilder, column, minValue, maxValue, table } = credentials;

    if (minValue !== undefined) {
      queryBuilder.andWhere(`${table}.${column} >= :minValue`, { minValue });
    }
    if (maxValue !== undefined) {
      queryBuilder.andWhere(`${table}.${column} <= :maxValue`, { maxValue });
    }
  }

  public async turnAgeToDateOfBirth(age: number) {
    const date = new Date();
    return new Date(date.setFullYear(date.getFullYear() - age));
  }
}
