import { Module } from '@nestjs/common';
import { CasheRepository } from './providers';
import { CacheService } from './cache.service';

@Module({
  providers: [CasheRepository, CacheService],
  exports: [CacheService],
})
export class CacheModule {}
