import { REFRESH_TOKEN_REPOSITORY } from '../constatns';
import { RefreshTokensTypeOrmRepository } from '../repositories';

export const AuthDbProviders = [
  {
    provide: REFRESH_TOKEN_REPOSITORY,
    useClass: RefreshTokensTypeOrmRepository,
  },
];
