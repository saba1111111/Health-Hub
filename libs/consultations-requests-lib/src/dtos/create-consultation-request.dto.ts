import { CitiesEntity } from 'libs/cities-lib';
import { SpecializationsEntity } from 'libs/specializations-lib';

export class BaseConsultationRequest {
  minAge?: number;
  maxAge?: number;
  minExperience?: number;
  maxExperience?: number;
  minRatePerHour?: number;
  maxRatePerHour?: number;
  gender?: string;
}

export class CreateConsultationRequest extends BaseConsultationRequest {
  cities?: Array<CitiesEntity>;
  specializations: Array<SpecializationsEntity>;
  patientId: number;
}

export class CreateConsultationRequestDto extends BaseConsultationRequest {
  cities?: Array<number>;
  specializations: Array<number>;
}
