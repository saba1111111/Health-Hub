import {
  CreateDoctorProfileSchema,
  CreateDoctorsProfileDto,
  DoctorsProfilesLibService,
  UpdateDoctorProfileDto,
  UpdateDoctorProfileSchema,
} from 'libs/doctors-profiles-lib';
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
  DOCTORS_PROFILES_CONTROLLER,
  JoiValidationPipe,
  ROLES,
  Roles,
  RolesGuard,
  UserRequest,
} from 'libs/common-lib';
import { UsersEntity } from 'libs/users-lib';
import { ApiTags } from '@nestjs/swagger';

@ApiTags(DOCTORS_PROFILES_CONTROLLER)
@Controller('doctors-profiles')
export class DoctorsProfilesController {
  constructor(
    private readonly doctorsProfilesService: DoctorsProfilesLibService,
  ) {}

  @Get('/getAll')
  @UseGuards(AccessTokenGuard, ProfileGuard)
  public getAllProfiles() {
    return this.doctorsProfilesService.findAllProfiles();
  }

  @Get('/findOne/:id')
  @UseGuards(AccessTokenGuard, ProfileGuard)
  public findProfile(@Param('id') id: number) {
    return this.doctorsProfilesService.findProfile({ id });
  }

  @Post('/create')
  @Roles(ROLES.DOCTOR)
  @UseGuards(AccessTokenGuard, RolesGuard)
  @UsePipes(new JoiValidationPipe(CreateDoctorProfileSchema))
  public createProfile(
    @Request() request: UserRequest<UsersEntity>,
    @Body() credentials: CreateDoctorsProfileDto,
  ) {
    return this.doctorsProfilesService.createProfile(request, credentials);
  }

  @Post('/update')
  @Roles(ROLES.DOCTOR)
  @UseGuards(AccessTokenGuard, ProfileGuard, RolesGuard)
  @UsePipes(new JoiValidationPipe(UpdateDoctorProfileSchema))
  public updateProfile(
    @Request() request: UserRequest<UsersEntity>,
    @Body() credentials: UpdateDoctorProfileDto,
  ) {
    return this.doctorsProfilesService.updateProfile(request, credentials);
  }
}
