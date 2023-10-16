import {
  BadRequestException,
  ConflictException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PATIENTS_PROFILES_DB_TOKEN } from '../constants';
import {
  CreatePatientsProfile,
  PatientsFindOptions,
  PatientsProfilesRepository,
  UpdatePatientProfile,
} from '../interfaces';
import { UserRequest } from 'libs/common-lib';
import { UsersEntity } from 'libs/users-lib';

@Injectable()
export class PatientsProfilesLibService {
  constructor(
    @Inject(PATIENTS_PROFILES_DB_TOKEN)
    private readonly patientsProfilesRepository: PatientsProfilesRepository,
  ) {}

  public async findProfile(findOptions: Partial<PatientsFindOptions>) {
    try {
      const profile =
        await this.patientsProfilesRepository.findOne(findOptions);
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
      const profiles = await this.patientsProfilesRepository.findAll();

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
    credentials: CreatePatientsProfile,
  ) {
    try {
      const checkProfileExistence = Boolean(
        await this.patientsProfilesRepository.findOne({ patientId: user.id }),
      );
      if (checkProfileExistence) {
        throw new ConflictException('You already have a profile as a patient!');
      }

      const profile = await this.patientsProfilesRepository.create({
        ...credentials,
        patientId: user.id,
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
    updateObject: Partial<UpdatePatientProfile>,
  ) {
    try {
      const profile = await this.findProfile({ patientId: user.id });

      await this.patientsProfilesRepository.updateById(
        profile.id,
        updateObject,
      );

      return {
        success: true,
        message: 'successfully update profile!',
      };
    } catch (error) {
      const message = error.message || 'Failed updating profile!';
      throw new BadRequestException(message);
    }
  }

  public async checkProfileExistenceStatus(id: number) {
    const profileExistenceStatus = Boolean(
      await this.patientsProfilesRepository.findOne({ patientId: id }),
    );

    if (!profileExistenceStatus) {
      throw new BadRequestException(
        'You dont have a profile. So, you can not access anything. First go and create profile!',
      );
    }
  }
}
