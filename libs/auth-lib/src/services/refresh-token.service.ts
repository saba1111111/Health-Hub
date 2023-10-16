import { Inject, Injectable } from '@nestjs/common';
import { REFRESH_TOKEN_REPOSITORY } from '../constatns';
import { CreateRefreshToken, RefreshTokensRepository } from '../interfaces';
import { RefreshTokensEntity } from '../entities';

@Injectable()
export class RefreshTokenService {
  constructor(
    @Inject(REFRESH_TOKEN_REPOSITORY)
    private readonly refreshTokenRepositry: RefreshTokensRepository,
  ) {}

  public async createRefreshToken(
    credentials: CreateRefreshToken,
  ): Promise<RefreshTokensEntity> {
    const oldRefreshToken = await this.refreshTokenRepositry.findOne({
      userId: credentials.userId,
      deviceId: credentials.deviceId,
    });
    if (oldRefreshToken) {
      await this.deleteRefreshTOken(oldRefreshToken.id);
    }

    return this.refreshTokenRepositry.create(credentials);
  }

  public findRefreshToken(id: number): Promise<RefreshTokensEntity> {
    return this.refreshTokenRepositry.findOne({ id });
  }

  public deleteRefreshTOken(id: number) {
    return this.refreshTokenRepositry.deleteById(id);
  }
}
