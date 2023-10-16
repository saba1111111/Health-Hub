import { Module } from '@nestjs/common';
import { SpecializationsLibService } from './services/specializations-lib.service';
import { SpecializationsDbProviders } from './providers';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SpecializationsEntity } from './entities';

@Module({
  imports: [TypeOrmModule.forFeature([SpecializationsEntity])],
  providers: [SpecializationsLibService, ...SpecializationsDbProviders],
  exports: [SpecializationsLibService],
})
export class SpecializationsLibModule {}
