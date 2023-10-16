import { BaseProfile } from 'libs/common-lib';
import { PartialType } from '@nestjs/swagger';

export class UpdateDoctorProfileDto extends PartialType(BaseProfile) {
  experienceInYears?: number;
  ratePerHour?: number;
  specializationId?: number;
  cityId?: number;
}
