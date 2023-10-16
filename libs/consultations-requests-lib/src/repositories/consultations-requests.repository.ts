import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BaseRepository } from 'libs/common-lib';
import { ConsultationsRequestsEntity } from '../entities';
import { ConsultationsRequestsRepository } from '../interfaces';
import { CreateConsultationRequest } from '../dtos';

export class ConsultationsRequestsTypeormRepository
  extends BaseRepository<ConsultationsRequestsEntity, CreateConsultationRequest>
  implements ConsultationsRequestsRepository
{
  constructor(
    @InjectRepository(ConsultationsRequestsEntity)
    private readonly consultationsRequestsRepository: Repository<ConsultationsRequestsEntity>,
  ) {
    super(consultationsRequestsRepository);
  }
}
