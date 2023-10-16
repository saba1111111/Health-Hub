import {
  Body,
  Controller,
  Post,
  UseGuards,
  UsePipes,
  Request,
  UseInterceptors,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AccessTokenGuard, ProfileGuard } from 'libs/auth-lib';
import {
  DOCTORS_SUGGESTIONS,
  JoiValidationPipe,
  ROLES,
  Roles,
  RolesGuard,
  UserRequest,
} from 'libs/common-lib';
import {
  CacheInterceptor,
  DoctorsSuggestionsLibService,
  GenerateSuggestionsDto,
  generateSuggestionsValidationSchema,
} from 'libs/doctors-suggestions-lib';
import { UsersEntity } from 'libs/users-lib';

@ApiTags(DOCTORS_SUGGESTIONS)
@Controller(DOCTORS_SUGGESTIONS)
export class DoctorsSuggestionsController {
  constructor(
    private readonly doctorsSuggestionsService: DoctorsSuggestionsLibService,
  ) {}

  @Post('/')
  @Roles(ROLES.PATIENT)
  @UseGuards(AccessTokenGuard, ProfileGuard, RolesGuard)
  @UseInterceptors(CacheInterceptor)
  @UsePipes(new JoiValidationPipe(generateSuggestionsValidationSchema))
  public async generateSuggestions(
    @Request() request: UserRequest<UsersEntity>,
    @Body() credentials: GenerateSuggestionsDto,
  ) {
    return this.doctorsSuggestionsService.generateSuggestions(
      request,
      credentials,
    );
  }
}
