import { Injectable } from '@nestjs/common';

@Injectable()
export abstract class TokenService {
  abstract signAccessToken(payload: object, config?: object): Promise<string>;
  abstract signRefreshToken(payload: object, config?: object): Promise<string>;
}
