import { CacheRepository } from '../abstracts';
import { RedisRepository } from '../repositories';

export const CasheRepository = {
  provide: CacheRepository,
  useClass: RedisRepository,
};
