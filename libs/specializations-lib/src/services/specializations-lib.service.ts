import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import {
  SpecializatioRepository,
  SpecializationsFindOptions,
} from '../interfaces';
import { SPECIALIZATIONS_REPOSITORY_TOKEN } from '../constants';
import { CreateSpecializationDto } from '../dtos';
import { SpecializationsEntity } from '../entities';

@Injectable()
export class SpecializationsLibService {
  constructor(
    @Inject(SPECIALIZATIONS_REPOSITORY_TOKEN)
    private readonly specializationRepository: SpecializatioRepository,
  ) {}

  public async findSpecialization(
    findOptions: Partial<SpecializationsFindOptions>,
  ) {
    try {
      const specialization =
        await this.specializationRepository.findOne(findOptions);
      if (!specialization) {
        throw new NotFoundException('No such Specialization!');
      }

      return {
        success: true,
        message: 'successfully find Specialization!',
        data: { specialization },
      };
    } catch (error) {
      throw new NotFoundException(error.message || 'No such Specialization!');
    }
  }

  public async findAll() {
    try {
      const specializations = await this.specializationRepository.findAll();

      return {
        success: true,
        message: 'successfully find Specializations!',
        data: { specializations },
      };
    } catch (error) {
      const message = error.message || 'Specializations are not avaliable!';
      throw new NotFoundException(message);
    }
  }

  public async createSpecialization(credentials: CreateSpecializationDto) {
    try {
      const SpecializationExistenceStatus = Boolean(
        await this.specializationRepository.findOne({
          name: credentials.name,
        }),
      );
      if (SpecializationExistenceStatus) {
        throw new BadRequestException(
          `Specialization ${credentials.name} already exists!`,
        );
      }

      const specialization =
        await this.specializationRepository.create(credentials);

      return {
        success: true,
        message: 'successfully create Specialization!',
        data: { specialization },
      };
    } catch (error) {
      const message = error.message || 'Failed creating Specialization!';
      throw new BadRequestException(message);
    }
  }

  public async updateSpecialization(
    specializationId: number,
    updateObject: Partial<CreateSpecializationDto>,
  ) {
    try {
      await this.checkSpecializationExistenceStatus(specializationId);

      await this.specializationRepository.updateById(
        specializationId,
        updateObject,
      );

      return {
        success: true,
        message: 'successfully update specialization!',
      };
    } catch (error) {
      const message = error.message || 'Failed updating specialization!';
      throw new BadRequestException(message);
    }
  }

  public async checkSpecializationExistenceStatus(id: number) {
    const specializationExistenceStatus = Boolean(
      await this.specializationRepository.findOne({ id }),
    );

    if (!specializationExistenceStatus) {
      throw new NotFoundException('No such specialization!');
    }
  }

  public async findSpecializations(
    specializationsIds: Array<number>,
  ): Promise<SpecializationsEntity[]> {
    const specializations = [];

    for (const specializationId of specializationsIds) {
      const specialization = await this.specializationRepository.findOne({
        id: specializationId,
      });

      if (!specialization) {
        throw new NotFoundException(
          `specialization with id ${specializationId} does not exist!`,
        );
      }

      specializations.push(specialization);
    }

    return specializations;
  }
}
