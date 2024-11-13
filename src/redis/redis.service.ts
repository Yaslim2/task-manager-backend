import { Injectable } from '@nestjs/common';
import { Redis } from 'ioredis';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class RedisService {
  private redisClient: Redis;

  constructor(private configService: ConfigService) {
    this.redisClient = new Redis({
      host: this.configService.get<string>('REDIS_HOST'),
      port: this.configService.get<number>('REDIS_PORT'),
    });
  }

  async setCache(key: string, value: string, ttl: number): Promise<void> {
    await this.redisClient.set(key, value, 'EX', ttl); // 'EX' define o tempo de expiração
  }

  async getCache(key: string): Promise<string | null> {
    return await this.redisClient.get(key);
  }

  async deleteCache(key: string): Promise<void> {
    await this.redisClient.del(key);
  }
}
