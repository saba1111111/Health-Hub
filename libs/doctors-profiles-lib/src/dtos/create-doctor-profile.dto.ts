import { BaseProfile } from 'libs/common-lib';

export class CreateDoctorsProfileDto extends BaseProfile {
  experienceInYears: number;
  ratePerHour: number;
  specializationId: number;
  cityId: number;
}

export class CreateDoctorsProfileDbDto extends CreateDoctorsProfileDto {
  doctorId: number;
}
