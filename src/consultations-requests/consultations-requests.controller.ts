import {
  ConsultationsRequestsLibService,
  CreateConsultationRequestDto,
  UpdateConsultationRequestDto,
  createConsultationRequestValidationSchema,
  updateConsultationRequestValidationSchema,
} from 'libs/consultations-requests-lib';
import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Request,
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import {
  JoiValidationPipe,
  ROLES,
  Roles,
  RolesGuard,
  TABLES,
  UserRequest,
} from 'libs/common-lib';
import { UsersEntity } from 'libs/users-lib';
import { ApiTags } from '@nestjs/swagger';
import { AccessTokenGuard, ProfileGuard } from 'libs/auth-lib';

@ApiTags(TABLES.CONSULTATIONS_REQUESTS_TABLE)
@Controller(TABLES.CONSULTATIONS_REQUESTS_TABLE)
export class ConsultationsRequestsController {
  constructor(
    private readonly consultationsRequestsService: ConsultationsRequestsLibService,
  ) {}

  @Get('/getAll')
  @Roles(ROLES.PATIENT)
  @UseGuards(AccessTokenGuard, ProfileGuard, RolesGuard)
  public getAllConsultationsRequest() {
    return this.consultationsRequestsService.findAllConsulationRequest();
  }

  @Get('/findOne/:id')
  @Roles(ROLES.PATIENT)
  @UseGuards(AccessTokenGuard, ProfileGuard, RolesGuard)
  public findConsultationsRequest(@Param('id') id: number) {
    return this.consultationsRequestsService.findConsultationRequest({ id });
  }

  @Post('/create')
  @Roles(ROLES.PATIENT)
  @UseGuards(AccessTokenGuard, ProfileGuard, RolesGuard)
  @UsePipes(new JoiValidationPipe(createConsultationRequestValidationSchema))
  public createConsultationsRequest(
    @Request() request: UserRequest<UsersEntity>,
    @Body() credentials: CreateConsultationRequestDto,
  ) {
    return this.consultationsRequestsService.createConsultaionRequest(
      request,
      credentials,
    );
  }

  @Post('/update')
  @Roles(ROLES.PATIENT)
  @UseGuards(AccessTokenGuard, ProfileGuard, RolesGuard)
  @UsePipes(new JoiValidationPipe(updateConsultationRequestValidationSchema))
  public updateConsultationsRequest(
    @Request() request: UserRequest<UsersEntity>,
    @Body() credentials: UpdateConsultationRequestDto,
  ) {
    return this.consultationsRequestsService.updateConsultationRequest(
      request,
      credentials,
    );
  }
}
