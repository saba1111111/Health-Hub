import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ConsultationsRequestsEntity } from '../entities';
import { CONSULTATIONS_REQUESTS_REPOSITORY_TOKEN } from '../constants';
import {
  ConsultationsRequestsRepository,
  consultationRequestCredentials,
} from '../interfaces';
import {
  CreateConsultationRequestDto,
  UpdateConsultationRequestDto,
} from '../dtos';
import { CitiesEntity, CitiesLibService } from 'libs/cities-lib';
import {
  SpecializationsEntity,
  SpecializationsLibService,
} from 'libs/specializations-lib';
import { TABLES, UserRequest } from 'libs/common-lib';
import { UsersEntity } from 'libs/users-lib';
import { DataSource } from 'typeorm';

@Injectable()
export class ConsultationsRequestsLibService {
  constructor(
    @Inject(CONSULTATIONS_REQUESTS_REPOSITORY_TOKEN)
    private readonly consultationsRequestsRepository: ConsultationsRequestsRepository,
    private readonly citiesService: CitiesLibService,
    private readonly specializationsService: SpecializationsLibService,
    private readonly dataSource: DataSource,
  ) {}

  public async findConsultationRequest(
    credentials: Partial<ConsultationsRequestsEntity>,
  ) {
    try {
      const consultationRequest =
        await this.consultationsRequestsRepository.findOne(credentials);

      if (!consultationRequest) {
        throw new NotFoundException('No such consultation request!');
      }

      return {
        success: true,
        message: 'successfully find consultation request!',
        data: { consultationRequest },
      };
    } catch (error) {
      const message =
        error.message || 'failed to find such consultation request!';
      throw new NotFoundException(message);
    }
  }

  public async findConsultationRequestWithJoins(
    credentials: Partial<ConsultationsRequestsEntity>,
  ) {
    const consultationRequestQueryBuilder =
      await this.buildConsultationRequestQuery(credentials);

    return consultationRequestQueryBuilder.getOne();
  }

  public async findAllConsulationRequest() {
    try {
      const consultationRequests =
        await this.consultationsRequestsRepository.findAll();

      return {
        success: true,
        message: 'successfully find consultation requests!',
        data: { consultationRequests },
      };
    } catch (error) {
      const message = error.message || 'failed to fetch consultation requests!';
      throw new NotFoundException(message);
    }
  }

  public async createConsultaionRequest(
    { user }: UserRequest<UsersEntity>,
    credentials: CreateConsultationRequestDto,
  ) {
    try {
      const consultaionRequestData =
        await this.validateAndTransformConsultationRequestCredentials(
          credentials,
        );

      const consultationRequest =
        await this.consultationsRequestsRepository.create({
          ...consultaionRequestData,
          patientId: user.id,
        });

      return {
        success: true,
        message: 'successfully create consultation request!',
        data: { consultationRequest },
      };
    } catch (error) {
      const message = error.message || 'failed to create consultation request!';
      throw new NotFoundException(message);
    }
  }

  public async updateConsultationRequest(
    { user }: UserRequest<UsersEntity>,
    { consultationRequestId, ...rest }: UpdateConsultationRequestDto,
  ) {
    try {
      const consultaionRequest =
        await this.consultationsRequestsRepository.findOne({
          id: consultationRequestId,
          patientId: user.id,
        });
      if (!consultaionRequest) {
        throw new BadRequestException(
          'Wrong credentials! No such consultations request.',
        );
      }

      const consultaionRequestData =
        await this.validateAndTransformConsultationRequestCredentials({
          ...rest,
        });

      const consultationRequestQueryBuilder =
        await this.buildConsultationRequestQuery({ id: consultationRequestId });
      consultationRequestQueryBuilder.update().set(consultaionRequestData);

      return {
        success: true,
        message: 'successfully update consultation request!',
      };
    } catch (error) {
      const message = error.message || 'failed to update consultation request!';
      throw new NotFoundException(message);
    }
  }

  public async validateAndTransformConsultationRequestCredentials(
    credentials: consultationRequestCredentials,
  ) {
    const consultaionRequestData = {
      ...credentials,
      cities: [] as Array<CitiesEntity>,
      specializations: [] as Array<SpecializationsEntity>,
    };

    if (credentials.cities && credentials.cities.length > 0) {
      const cities = await this.citiesService.findCites(credentials.cities);
      consultaionRequestData.cities = cities;
    } else {
      delete consultaionRequestData.cities;
    }

    if (credentials.specializations && credentials.specializations.length > 0) {
      consultaionRequestData.specializations =
        await this.specializationsService.findSpecializations(
          credentials.specializations,
        );
    } else {
      delete consultaionRequestData.specializations;
    }

    return consultaionRequestData;
  }

  public async checkConsultationRequestStatus(id: number) {
    const consultationRequestExistenceStatus = Boolean(
      await this.consultationsRequestsRepository.findOne({ id }),
    );
    if (!consultationRequestExistenceStatus) {
      throw new NotFoundException('No such consultation request!');
    }

    return true;
  }

  public async buildConsultationRequestQuery(
    credentials: Partial<ConsultationsRequestsEntity>,
  ) {
    const table = TABLES.CONSULTATIONS_REQUESTS_TABLE;

    const consultationRequestQueryBuilder =
      this.dataSource.manager.createQueryBuilder(
        ConsultationsRequestsEntity,
        table,
      );

    consultationRequestQueryBuilder.where(credentials);

    consultationRequestQueryBuilder.leftJoinAndSelect(
      `${table}.specializations`,
      'specializations',
    );

    consultationRequestQueryBuilder.leftJoinAndSelect(
      `${table}.cities`,
      'cities',
    );

    return consultationRequestQueryBuilder;
  }
}
