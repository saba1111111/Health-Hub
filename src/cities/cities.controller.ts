import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AccessTokenGuard } from 'libs/auth-lib';
import {
  CitiesLibService,
  CreateCityDto,
  createCitySchema,
} from 'libs/cities-lib';
import {
  CITIES_CONTROLLER,
  JoiValidationPipe,
  ROLES,
  Roles,
  RolesGuard,
} from 'libs/common-lib';

@ApiTags(CITIES_CONTROLLER)
@Controller(CITIES_CONTROLLER)
export class CitiesController {
  constructor(private readonly citiesService: CitiesLibService) {}

  @Get('/getAll')
  @UseGuards(AccessTokenGuard)
  public getAllCity() {
    return this.citiesService.findAll();
  }

  @Get('/findOne/:id')
  @UseGuards(AccessTokenGuard)
  public findCity(@Param('id') id: number) {
    return this.citiesService.findCity({ id });
  }

  @Post('/create')
  @Roles(ROLES.ADMIN)
  @UseGuards(AccessTokenGuard, RolesGuard)
  @UsePipes(new JoiValidationPipe(createCitySchema))
  public createCity(@Body() credentials: CreateCityDto) {
    return this.citiesService.createCity(credentials);
  }
}
