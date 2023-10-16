import { BaseRepository } from 'libs/common-lib';
import { PatientsHiddenDoctorsEntity } from '../entities';
import { CreatePatientHiddenDoctor } from './create-patient-hidden-doctor.interface';

interface PatientHiddenDoctorRepositoryExtension {}

type PatientsHiddenDoctorsRepository = BaseRepository<
  PatientsHiddenDoctorsEntity,
  CreatePatientHiddenDoctor
> &
  PatientHiddenDoctorRepositoryExtension;

export { PatientsHiddenDoctorsRepository };
