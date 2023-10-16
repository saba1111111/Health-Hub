import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Request } from 'express';
import { Injectable, NotFoundException } from '@nestjs/common';
import { UsersService } from 'libs/users-lib';
import { ENVS } from 'libs/common-lib';
import { PASSWORD_RESSET_STRATEGY } from '../constatns';

@Injectable()
export class PasswordRessetStrategy extends PassportStrategy(
  Strategy,
  PASSWORD_RESSET_STRATEGY,
) {
  constructor(
    private readonly configService: ConfigService,
    private readonly userService: UsersService,
  ) {
    super({
      secretOrKey: configService.get(ENVS.PASSWORD_RESET_SECRET),
      ignoreExpiration: false,
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request: Request) => {
          const token = request.body?.token;

          if (!token) {
            return null;
          }

          return token;
        },
      ]),
    });
  }

  async validate(payload: any) {
    const { email } = payload;
    const user = await this.userService.findOne({ email });

    if (!user) {
      throw new NotFoundException('No such account!');
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...rest } = user;

    return rest;
  }
}
