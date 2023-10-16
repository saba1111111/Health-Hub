import { AuthGuard } from '@nestjs/passport';
import { PASSWORD_RESSET_STRATEGY } from '../constatns';

export class ResetPasswordGuard extends AuthGuard(PASSWORD_RESSET_STRATEGY) {}
