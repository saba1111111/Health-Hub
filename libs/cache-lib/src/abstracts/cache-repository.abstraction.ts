import { CacheKey, AddValueWithOptionalExpiration } from '../interfaces';

export abstract class CacheRepository {
  abstract findOne(key: CacheKey): Promise<string | Buffer | null>;
  abstract create(
    credentials: AddValueWithOptionalExpiration,
  ): Promise<string | null>;
  abstract delete(key: CacheKey): Promise<number>;
}
