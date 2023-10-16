import {
  CreateSpecializationDto,
  SpecializationsLibService,
  createSpecializationSchema,
} from 'libs/specializations-lib';
import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import { AccessTokenGuard } from 'libs/auth-lib';
import {
  JoiValidationPipe,
  ROLES,
  Roles,
  RolesGuard,
  SPECIALIZATIONS_CONTROLLER,
} from 'libs/common-lib';
import { ApiTags } from '@nestjs/swagger';

@ApiTags(SPECIALIZATIONS_CONTROLLER)
@Controller(SPECIALIZATIONS_CONTROLLER)
export class SpecializationsController {
  constructor(
    private readonly specializationService: SpecializationsLibService,
  ) {}

  @Get('/getAll')
  @UseGuards(AccessTokenGuard)
  public getAllSpecialization() {
    return this.specializationService.findAll();
  }

  @Get('/findOne/:id')
  @UseGuards(AccessTokenGuard)
  public findSpecialization(@Param('id') id: number) {
    return this.specializationService.findSpecialization({ id });
  }

  @Post('/create')
  @Roles(ROLES.ADMIN)
  @UseGuards(AccessTokenGuard, RolesGuard)
  @UsePipes(new JoiValidationPipe(createSpecializationSchema))
  public createSpecialization(@Body() credentials: CreateSpecializationDto) {
    return this.specializationService.createSpecialization(credentials);
  }
}
