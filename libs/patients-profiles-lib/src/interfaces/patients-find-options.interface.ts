import { BaseProfile } from 'libs/common-lib';

export interface PatientsFindOptions extends BaseProfile {
  id: number;
  patientId: number;
}
