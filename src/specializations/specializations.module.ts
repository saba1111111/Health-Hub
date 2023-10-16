import { Module } from '@nestjs/common';
import { SpecializationsController } from './specializations.controller';
import { SpecializationsLibModule } from 'libs/specializations-lib';

@Module({
  imports: [SpecializationsLibModule],
  controllers: [SpecializationsController],
})
export class SpecializationsModule {}
