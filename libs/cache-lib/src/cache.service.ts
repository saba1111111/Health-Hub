import { Injectable } from '@nestjs/common';
import { CacheRepository } from './abstracts';
import {
  AddValue,
  AddValueWithExpiration,
  AddValueWithOptionalExpiration,
  CacheKey,
} from './interfaces';

@Injectable()
export class CacheService {
  public constructor(private readonly cacheRepository: CacheRepository) {}

  public async add(credentials: AddValue): Promise<string>;
  public async add(credentials: AddValueWithExpiration): Promise<string>;
  public async add(
    credentials: AddValueWithOptionalExpiration,
  ): Promise<string> {
    return this.cacheRepository.create(credentials);
  }

  public async get(key: CacheKey): Promise<string | Buffer | null> {
    const data = await this.cacheRepository.findOne(key);
    return data || null;
  }

  public async remove(key: CacheKey): Promise<number> {
    return this.cacheRepository.delete(key);
  }
}
