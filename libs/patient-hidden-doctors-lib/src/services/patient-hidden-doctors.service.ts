import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PATIENTS_HIDDEN_DOCTORS_DB_TOKEN } from '../constants';
import {
  FilterHiddenDoctorsProfiles,
  PatientsHiddenDoctorsRepository,
} from '../interfaces';
import { PatientsProfilesEntity } from 'libs/patients-profiles-lib/entities';
import { UsersEntity, UsersService } from 'libs/users-lib';
import { ROLES, UserRequest } from 'libs/common-lib';
import { HideOrUnHideDoctorDto } from '../dtos';

@Injectable()
export class PatientHiddenDoctorsLibService {
  constructor(
    @Inject(PATIENTS_HIDDEN_DOCTORS_DB_TOKEN)
    private readonly patientHiddentDoctorsRepository: PatientsHiddenDoctorsRepository,
    private readonly userService: UsersService,
  ) {}

  public async findPatientHiddenDoctorInstance(
    credentials: Partial<PatientsProfilesEntity>,
  ) {
    try {
      const patientHiddenDoctorInstance =
        await this.patientHiddentDoctorsRepository.findOne(credentials);

      if (!patientHiddenDoctorInstance) {
        throw new NotFoundException('No such patient hidden doctor instance.');
      }

      return {
        success: true,
        message: 'successfully find patient hidden doctor instance!',
        data: { patientHiddenDoctorInstance },
      };
    } catch (error) {
      const message =
        error.message || 'failed to find such  patient hidden doctor instance!';
      throw new NotFoundException(message);
    }
  }

  public async findAllPatientHiddenDoctorInstances() {
    try {
      const patientHiddenDoctorInstances =
        await this.patientHiddentDoctorsRepository.findAll();

      return {
        success: true,
        message: 'successfully find patients hidden doctors instances!',
        data: { patientHiddenDoctorInstances },
      };
    } catch (error) {
      const message =
        error.message || 'failed to fetch patients hidden doctors instances!';
      throw new NotFoundException(message);
    }
  }

  public async createPateintHiddenDoctorsInstance(
    { user }: UserRequest<UsersEntity>,
    { doctorId }: HideOrUnHideDoctorDto,
  ) {
    try {
      await this.checkDoctorExistenceStatus(doctorId);

      const patientAlreadyHideDoctorStatus =
        await this.patientHiddentDoctorsRepository.findOne({
          doctorId,
          patientId: user.id,
        });
      if (patientAlreadyHideDoctorStatus) {
        throw new BadRequestException('The doctor is already hidden for you.');
      }

      await this.patientHiddentDoctorsRepository.create({
        doctorId,
        patientId: user.id,
      });

      return {
        success: true,
        message: 'successfully create patient hidden doctor instance!',
      };
    } catch (error) {
      const message =
        error.message ||
        'failed to create such patient hidden doctor instance!';
      throw new BadRequestException(message);
    }
  }

  public async unHideDoctor(
    { user }: UserRequest<UsersEntity>,
    { doctorId }: HideOrUnHideDoctorDto,
  ) {
    try {
      await this.checkDoctorExistenceStatus(doctorId);

      const patientHiddenDoctor =
        await this.patientHiddentDoctorsRepository.findOne({
          doctorId,
          patientId: user.id,
        });
      if (!patientHiddenDoctor) {
        throw new BadRequestException('The doctor is not hidden for you.');
      }

      await this.patientHiddentDoctorsRepository.deleteById(
        patientHiddenDoctor.id,
      );

      return {
        success: true,
        message: 'successfully unhide doctor!',
      };
    } catch (error) {
      const message = error.message || 'failed unhide doctor!';
      throw new BadRequestException(message);
    }
  }

  public async checkDoctorExistenceStatus(doctorId: number) {
    const doctorExistenceStatus = Boolean(
      await this.userService.findOne({
        id: doctorId,
        role: ROLES.DOCTOR,
      }),
    );

    if (!doctorExistenceStatus) {
      throw new NotFoundException(`Doctor with id ${doctorId} does not exist!`);
    }
  }

  public async filterHiddenDoctorsProfiles(
    credentials: FilterHiddenDoctorsProfiles,
  ) {
    const { doctorsProfiles, patientId } = credentials;

    const patientHiddenDoctorsList =
      await this.patientHiddentDoctorsRepository.find({
        patientId,
      });
    if (patientHiddenDoctorsList.length == 0) {
      return doctorsProfiles;
    }

    const hiddenDoctorsIds = patientHiddenDoctorsList.map(
      (patientHiddenDoctor) => patientHiddenDoctor.doctorId,
    );
    return doctorsProfiles.filter(
      (profile) => !hiddenDoctorsIds.includes(profile.doctorId),
    );
  }
}
