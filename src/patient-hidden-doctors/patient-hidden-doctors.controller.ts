import { PatientHiddenDoctorsLibService } from 'libs/patient-hidden-doctors-lib';
import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  UseGuards,
  UsePipes,
  Request,
} from '@nestjs/common';
import { AccessTokenGuard, ProfileGuard } from 'libs/auth-lib';
import {
  JoiValidationPipe,
  ROLES,
  Roles,
  RolesGuard,
  TABLES,
  UserRequest,
} from 'libs/common-lib';
import { HideOrUnHideDoctorDto } from 'libs/patient-hidden-doctors-lib/dtos';
import { UsersEntity } from 'libs/users-lib';
import { hideOrUnhideDoctoreValidationSchema } from 'libs/patient-hidden-doctors-lib/validations/schemas';
import { ApiTags } from '@nestjs/swagger';

@ApiTags(TABLES.PATIENT_HIDDEN_DOCTORS)
@Controller(TABLES.PATIENT_HIDDEN_DOCTORS)
export class PatientHiddenDoctorsController {
  constructor(
    private readonly patientHiddenDoctorService: PatientHiddenDoctorsLibService,
  ) {}

  @Get('/getAll')
  @Roles(ROLES.PATIENT)
  @UseGuards(AccessTokenGuard, ProfileGuard, RolesGuard)
  public getAllPatientHiddenDoctorsInstances() {
    return this.patientHiddenDoctorService.findAllPatientHiddenDoctorInstances();
  }

  @Get('/findOne/:id')
  @Roles(ROLES.PATIENT)
  @UseGuards(AccessTokenGuard, ProfileGuard, RolesGuard)
  public findPatientHiddenDoctorsInstance(@Param('id') id: number) {
    return this.patientHiddenDoctorService.findPatientHiddenDoctorInstance({
      id,
    });
  }

  @Post('/hide')
  @Roles(ROLES.PATIENT)
  @UseGuards(AccessTokenGuard, ProfileGuard, RolesGuard)
  @UsePipes(new JoiValidationPipe(hideOrUnhideDoctoreValidationSchema))
  public hideDoctors(
    @Request() request: UserRequest<UsersEntity>,
    @Body() credentials: HideOrUnHideDoctorDto,
  ) {
    return this.patientHiddenDoctorService.createPateintHiddenDoctorsInstance(
      request,
      credentials,
    );
  }

  @Post('/unHide')
  @Roles(ROLES.PATIENT)
  @UseGuards(AccessTokenGuard, ProfileGuard, RolesGuard)
  @UsePipes(new JoiValidationPipe(hideOrUnhideDoctoreValidationSchema))
  public unHideDoctors(
    @Request() request: UserRequest<UsersEntity>,
    @Body() credentials: HideOrUnHideDoctorDto,
  ) {
    return this.patientHiddenDoctorService.unHideDoctor(request, credentials);
  }
}
