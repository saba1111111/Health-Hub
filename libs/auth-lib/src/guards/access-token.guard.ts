import { AuthGuard } from '@nestjs/passport';
import { ACCESS_TOKEN_STRATEGY } from '../constatns';

export class AccessTokenGuard extends AuthGuard(ACCESS_TOKEN_STRATEGY) {}
