import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Redis from 'ioredis';
import { CacheRepository } from '../abstracts';
import { ENVS } from 'libs/common-lib';
import { AddValueWithOptionalExpiration, CacheKey } from '../interfaces';

@Injectable()
export class RedisRepository implements CacheRepository {
  private redisClient: Redis;

  public constructor(configService: ConfigService) {
    this.redisClient = new Redis({
      host: configService.get<string>(ENVS.REDIS_HOST),
      port: Number(configService.get<string>(ENVS.REDIS_PORT)),
    });
  }

  public async findOne(key: CacheKey): Promise<string | null> {
    return this.redisClient.get(key);
  }

  public async create(
    credentials: AddValueWithOptionalExpiration,
  ): Promise<string> {
    const { key, value, expiration } = credentials;
    if (credentials.expiration != undefined) {
      return this.redisClient.set(key, value, 'EX', expiration);
    }
    return this.redisClient.set(key, value);
  }

  public async delete(key: CacheKey): Promise<number> {
    return this.redisClient.del(key);
  }
}
