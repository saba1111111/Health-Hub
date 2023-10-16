import { Injectable } from '@nestjs/common';
import { CreateRefreshToken, RefreshTokensRepository } from '../interfaces';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RefreshTokensEntity } from '../entities';
import { BaseRepository } from 'libs/common-lib';

@Injectable()
export class RefreshTokensTypeOrmRepository
  extends BaseRepository<RefreshTokensEntity, CreateRefreshToken>
  implements RefreshTokensRepository
{
  constructor(
    @InjectRepository(RefreshTokensEntity)
    private readonly refreshTokenRepository: Repository<RefreshTokensEntity>,
  ) {
    super(refreshTokenRepository);
  }
}
