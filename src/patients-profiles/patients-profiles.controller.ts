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
import { ApiTags } from '@nestjs/swagger';
import { AccessTokenGuard, ProfileGuard } from 'libs/auth-lib';
import {
  PATIENTS_PROFILES_CONTROLLER,
  ROLES,
  Roles,
  RolesGuard,
  UserRequest,
} from 'libs/common-lib';
import { JoiValidationPipe } from 'libs/common-lib/pipes';
import {
  CreatePatientProfileSchema,
  PatientsProfilesLibService,
  UpdatePatientProfileSchema,
} from 'libs/patients-profiles-lib';
import {
  CreatePatientsProfile,
  UpdatePatientProfile,
} from 'libs/patients-profiles-lib/interfaces';
import { UsersEntity } from 'libs/users-lib';

@ApiTags(PATIENTS_PROFILES_CONTROLLER)
@Controller(PATIENTS_PROFILES_CONTROLLER)
export class PatientsProfilesController {
  constructor(
    private readonly patientsProfilesService: PatientsProfilesLibService,
  ) {}

  @Get('/getAll')
  @UseGuards(AccessTokenGuard, ProfileGuard)
  public getAllProfiles() {
    return this.patientsProfilesService.findAllProfiles();
  }

  @Get('/findOne/:id')
  @UseGuards(AccessTokenGuard, ProfileGuard)
  public findProfile(@Param('id') id: number) {
    return this.patientsProfilesService.findProfile({ id });
  }

  @Post('/create')
  @Roles(ROLES.PATIENT)
  @UseGuards(AccessTokenGuard, RolesGuard)
  @UsePipes(new JoiValidationPipe(CreatePatientProfileSchema))
  public createProfile(
    @Request() request: UserRequest<UsersEntity>,
    @Body() credentials: CreatePatientsProfile,
  ) {
    return this.patientsProfilesService.createProfile(request, credentials);
  }

  @Post('/update')
  @Roles(ROLES.PATIENT)
  @UseGuards(AccessTokenGuard, ProfileGuard, RolesGuard)
  @UsePipes(new JoiValidationPipe(UpdatePatientProfileSchema))
  public updateProfile(
    @Request() request: UserRequest<UsersEntity>,
    @Body() credentials: UpdatePatientProfile,
  ) {
    return this.patientsProfilesService.updateProfile(request, credentials);
  }
}
