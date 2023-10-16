import { DoctorsProfilesEntity } from 'libs/doctors-profiles-lib';

export interface FilterHiddenDoctorsProfiles {
  patientId: number;
  doctorsProfiles: DoctorsProfilesEntity[];
}
