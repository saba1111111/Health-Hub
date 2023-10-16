import { BaseProfile } from 'libs/common-lib';

export interface CreatePatientsProfile extends BaseProfile {}

export interface CreatePatientsProfileDb extends BaseProfile {
  patientId: number;
}
