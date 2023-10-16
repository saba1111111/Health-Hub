import { CitiesEntity } from 'libs/cities-lib';
import { BaseConsultationRequest } from 'libs/consultations-requests-lib';
import { SpecializationsEntity } from 'libs/specializations-lib';

export interface GenerateMatchProfilesCredentials
  extends BaseConsultationRequest {
  cities?: Array<CitiesEntity>;
  specializations?: Array<SpecializationsEntity>;
}
