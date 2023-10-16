import { PATIENTS_HIDDEN_DOCTORS_DB_TOKEN } from '../constants';
import { PatientHiddenDoctorsTypeormRepository } from '../repositories';

export const PatientsHiddenDoctorsDbProviders = [
  {
    provide: PATIENTS_HIDDEN_DOCTORS_DB_TOKEN,
    useClass: PatientHiddenDoctorsTypeormRepository,
  },
];
