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
  COUNTRIES_CONTROLLER,
  JoiValidationPipe,
  ROLES,
  Roles,
  RolesGuard,
} from 'libs/common-lib';
import { CountriesService, createCountrySchema } from 'libs/countries-lib';
import { CreateCountryDto } from 'libs/countries-lib/dtos';

@ApiTags(COUNTRIES_CONTROLLER)
@Controller(COUNTRIES_CONTROLLER)
export class CountriesController {
  constructor(private readonly countriesService: CountriesService) {}

  @Get('/getAll')
  @UseGuards(AccessTokenGuard)
  public getAllCountry() {
    return this.countriesService.findAll();
  }

  @Get('/findOne/:id')
  @UseGuards(AccessTokenGuard)
  public findCountry(@Param('id') id: number) {
    return this.countriesService.findCountry({ id });
  }

  @Post('/create')
  @Roles(ROLES.ADMIN)
  @UseGuards(AccessTokenGuard, RolesGuard)
  @UsePipes(new JoiValidationPipe(createCountrySchema))
  public createCountry(@Body() credentials: CreateCountryDto) {
    return this.countriesService.createCountry(credentials);
  }
}
