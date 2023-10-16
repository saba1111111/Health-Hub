import { Module } from '@nestjs/common';
import { ConsultationsRequestsLibService } from './services/consultations-requests-lib.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConsultationsRequestsEntity } from './entities';
import { ConsultationsRequestsDbProviders } from './providers';
import { CitiesLibModule } from 'libs/cities-lib';
import { SpecializationsLibModule } from 'libs/specializations-lib';

@Module({
  imports: [
    TypeOrmModule.forFeature([ConsultationsRequestsEntity]),
    CitiesLibModule,
    SpecializationsLibModule,
  ],
  providers: [
    ConsultationsRequestsLibService,
    ...ConsultationsRequestsDbProviders,
  ],
  exports: [ConsultationsRequestsLibService],
})
export class ConsultationsRequestsLibModule {}
