// redis-cache.repository.ts
import { Injectable } from '@nestjs/common';
import { RedisService } from '@liaoliaots/nestjs-redis';
import Redis from 'ioredis';

@Injectable()
export class RedisCacheRepository {
  private readonly redis: Redis | null;

  constructor(private readonly redisService: RedisService) {
    this.redis = this.redisService.getOrThrow();
  }

  async saveData<T>(data: T, key: string): Promise<void> {
    await this.redis.set(key, JSON.stringify(data), 'EX', 180); // TTL de 3 minutos
  }

  async getData<T>(key: string): Promise<T> {
    const data = await this.redis.get(key);
    return data ? JSON.parse(data) : null;
  }

  async del(key: string): Promise<void> {
    await this.redis.del(key);
  }

  async getKeys(pattern: string): Promise<string[]> {
    return await this.redis.keys(pattern);
  }
}
