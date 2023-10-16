import { BaseRepository } from 'libs/common-lib';
import { ConsultationsRequestsEntity } from '../entities';
import { CreateConsultationRequest } from '../dtos';

interface ConsultationsRequestsRepositoryExtension {}

type ConsultationsRequestsRepository = BaseRepository<
  ConsultationsRequestsEntity,
  CreateConsultationRequest
> &
  ConsultationsRequestsRepositoryExtension;

export { ConsultationsRequestsRepository };
