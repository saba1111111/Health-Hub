import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Request } from 'express';
import { ACCESS_TOKEN_STRATEGY, TOKENS } from '../constatns';
import { ENVS, ROLES } from 'libs/common-lib';
import { UsersService } from 'libs/users-lib';

@Injectable()
export class AccessTokenStrategy extends PassportStrategy(
  Strategy,
  ACCESS_TOKEN_STRATEGY,
) {
  constructor(
    private readonly configService: ConfigService,
    private readonly userService: UsersService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request: Request) => {
          const token = request?.cookies?.[TOKENS.ACCESS_TOKEN];

          if (!token) {
            return null;
          }

          return token;
        },
      ]),
      ignoreExpiration: false,
      secretOrKey: configService.get(ENVS.ACCESS_TOKEN_SECRET),
    });
  }

  async validate(payload: any) {
    const { id } = payload;
    const user = await this.userService.findOne({ id });

    if (!user) throw new UnauthorizedException('No such User!');
    if (!user.verified) throw new UnauthorizedException('User is UnVerified!');

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...rest } = user;

    return rest;
  }
}
