import { AuthGuard } from '@nestjs/passport';
import { REFRESH_TOKEN_STRATEGY } from '../constatns';

export class RefreshTokenGuard extends AuthGuard(REFRESH_TOKEN_STRATEGY) {}
