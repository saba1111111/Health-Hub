import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CacheModule } from 'libs/cache-lib';
import { JwtModule } from '@nestjs/jwt';
import { UtilsModule } from 'libs/utils-lib';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CountriesModule } from './countries/countries.module';
import { CitiesModule } from './cities/cities.module';
import { DatabaseConfig } from 'libs/config-lib';
import { SpecializationsModule } from './specializations/specializations.module';
import { DoctorsProfilesModule } from './doctors-profiles/doctors-profiles.module';
import { PatientsProfilesModule } from './patients-profiles/patients-profiles.module';
import { ROLES_GUARD_TOKEN, RolesGuard, envsSchema } from 'libs/common-lib';
import { ProfileGuard } from 'libs/auth-lib';
import { ConsultationsRequestsModule } from './consultations-requests/consultations-requests.module';
import { PatientHiddenDoctorsModule } from './patient-hidden-doctors/patient-hidden-doctors.module';
import { DoctorsSuggestionsModule } from './doctors-suggestions/doctors-suggestions.module';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';

@Module({
  imports: [
    ConfigModule.forRoot({
      validationSchema: envsSchema,
      isGlobal: true,
    }),
    JwtModule.register({
      global: true,
    }),
    TypeOrmModule.forRoot(DatabaseConfig),
    ThrottlerModule.forRoot([
      {
        ttl: 60,
        limit: 100,
      },
    ]),
    CacheModule,
    UtilsModule,
    AuthModule,
    CitiesModule,
    CountriesModule,
    SpecializationsModule,
    DoctorsProfilesModule,
    PatientsProfilesModule,
    ConsultationsRequestsModule,
    PatientHiddenDoctorsModule,
    DoctorsSuggestionsModule,
  ],
  controllers: [],
  providers: [
    {
      provide: ROLES_GUARD_TOKEN,
      useClass: RolesGuard,
    },
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
    ProfileGuard,
  ],
})
export class AppModule {}
