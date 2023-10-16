import { CONSULTATIONS_REQUESTS_REPOSITORY_TOKEN } from '../constants';
import { ConsultationsRequestsTypeormRepository } from '../repositories/consultations-requests.repository';

export const ConsultationsRequestsDbProviders = [
  {
    provide: CONSULTATIONS_REQUESTS_REPOSITORY_TOKEN,
    useClass: ConsultationsRequestsTypeormRepository,
  },
];
