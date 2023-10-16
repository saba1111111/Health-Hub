import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { ROLES } from 'libs/common-lib';
import { DoctorsProfilesLibService } from 'libs/doctors-profiles-lib';
import { PatientsProfilesLibService } from 'libs/patients-profiles-lib';

@Injectable()
export class ProfileGuard implements CanActivate {
  constructor(
    private readonly doctorsProfilesService: DoctorsProfilesLibService,
    private readonly patientsProfilesService: PatientsProfilesLibService,
  ) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const user = request.user;

    if (user.role === ROLES.DOCTOR) {
      await this.doctorsProfilesService.checkProfileExistenceStatus(user.id);
    }

    if (user.role === ROLES.PATIENT) {
      await this.patientsProfilesService.checkProfileExistenceStatus(user.id);
    }

    return true;
  }
}
