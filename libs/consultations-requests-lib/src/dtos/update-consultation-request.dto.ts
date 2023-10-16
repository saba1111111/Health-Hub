import { BaseConsultationRequest } from './create-consultation-request.dto';

export class UpdateConsultationRequestDto extends BaseConsultationRequest {
  consultationRequestId: number;
  cities?: Array<number>;
  specializations?: Array<number>;
}
