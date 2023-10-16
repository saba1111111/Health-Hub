import { Module } from '@nestjs/common';
import {
  AccessTokenStrategy,
  AuthLibModule,
  LocalStrategy,
  PasswordRessetStrategy,
  RefreshTokenStrategy,
} from 'libs/auth-lib';
import { PassportModule } from '@nestjs/passport';
import { UsersModule } from 'libs/users-lib';
import { AuthController } from './auth.controller';
import { DoctorsProfilesLibModule } from 'libs/doctors-profiles-lib';
import { PatientsProfilesLibModule } from 'libs/patients-profiles-lib';

@Module({
  imports: [
    AuthLibModule,
    PassportModule,
    UsersModule,
    DoctorsProfilesLibModule,
    PatientsProfilesLibModule,
  ],
  providers: [
    LocalStrategy,
    RefreshTokenStrategy,
    AccessTokenStrategy,
    PasswordRessetStrategy,
  ],
  controllers: [AuthController],
})
export class AuthModule {}
