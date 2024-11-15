// redis-cache.module.ts
import { Module } from '@nestjs/common';
import { RedisCacheRepository } from './redis-cache-repository';

@Module({
  imports: [],
  providers: [RedisCacheRepository],
  exports: [RedisCacheRepository],
})
export class CacheRedisModule {}
