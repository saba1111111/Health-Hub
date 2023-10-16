import { BaseRepository } from 'libs/common-lib';
import { CreateRefreshToken } from './create-refresh-token.interface';
import { RefreshTokensEntity } from '../entities';

interface RefreshTokensRepositoryExtension {}

type RefreshTokensRepository = BaseRepository<
  RefreshTokensEntity,
  CreateRefreshToken
> &
  RefreshTokensRepositoryExtension;

export { RefreshTokensRepository };
