import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService as JWT } from '@nestjs/jwt';
import { JwtConfig, JwtTokenPayload } from '../interfaces';
import { TokenService } from '../abstracts';
import { ENVS } from 'libs/common-lib';

@Injectable()
export class JwtService implements TokenService {
  public constructor(
    private readonly configService: ConfigService,
    private readonly jwtService: JWT,
  ) {}

  public signAccessToken(
    payload: JwtTokenPayload,
    config?: JwtConfig,
  ): Promise<string> {
    const secret =
      config?.secret ||
      this.configService.get<string>(ENVS.ACCESS_TOKEN_SECRET);
    const expiresIn =
      (config?.expiresInSeconds ||
        this.configService.get<string>(ENVS.ACCESS_TOKEN_EXPIRATION_TIME)) +
      's';

    return this.jwtService.signAsync(payload, { secret, expiresIn });
  }

  public signRefreshToken(
    payload: JwtTokenPayload,
    config?: JwtConfig,
  ): Promise<string> {
    const secret =
      config?.secret ||
      this.configService.get<string>(ENVS.REFRESH_TOKEN_SECRET);
    const expiresIn =
      (config?.expiresInSeconds ||
        this.configService.get<string>(ENVS.REFRESH_TOKEN_EXPIRATION_TIME)) +
      's';

    return this.jwtService.signAsync(payload, { secret, expiresIn });
  }
}
