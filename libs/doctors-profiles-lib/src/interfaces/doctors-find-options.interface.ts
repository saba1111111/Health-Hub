import { BaseProfile } from 'libs/common-lib';

export interface DoctorsFindOptions extends BaseProfile {
  id: number;
  experienceInYears: number;
  ratePerHour: number;
  specializationId: number;
  cityId: number;
  doctorId: number;
}
