import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { GenerateSuggestionsDto } from './dtos';
import { UserRequest } from 'libs/common-lib';
import { UsersEntity } from 'libs/users-lib';
import { ConsultationsRequestsLibService } from 'libs/consultations-requests-lib';
import { DoctorsProfilesLibService } from 'libs/doctors-profiles-lib';
import { PatientHiddenDoctorsLibService } from 'libs/patient-hidden-doctors-lib';

@Injectable()
export class DoctorsSuggestionsLibService {
  constructor(
    private readonly consultationsRequestsService: ConsultationsRequestsLibService,
    private readonly doctoreProfilesService: DoctorsProfilesLibService,
    private readonly patientHiddenDoctorsService: PatientHiddenDoctorsLibService,
  ) {}

  public async generateSuggestions(
    { user }: UserRequest<UsersEntity>,
    credentials: GenerateSuggestionsDto,
  ) {
    try {
      const consultationRequest =
        await this.consultationsRequestsService.findConsultationRequestWithJoins(
          {
            id: credentials.consultationRequestId,
            patientId: user.id,
          },
        );

      if (!consultationRequest) {
        throw new BadRequestException(
          'Wrong credentials! You donth have such consultation request!',
        );
      }

      const doctors =
        await this.doctoreProfilesService.generateMatchProfiles(
          consultationRequest,
        );

      const filterHiddenDoctors =
        await this.patientHiddenDoctorsService.filterHiddenDoctorsProfiles({
          patientId: user.id,
          doctorsProfiles: doctors,
        });

      return {
        success: true,
        message: 'Successfully generate doctors list.',
        data: {
          matchDoctors: filterHiddenDoctors,
          consultationRequestId: credentials.consultationRequestId,
        },
      };
    } catch (error) {
      const message = error.message || 'Failed to generate suggestions!';
      throw new InternalServerErrorException(message);
    }
  }
}
