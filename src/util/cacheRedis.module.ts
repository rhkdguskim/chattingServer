import { Module } from '@nestjs/common';
import { CacheModule } from "@nestjs/cache-manager";
import * as redisCacheStore from "cache-manager-ioredis";
import * as config from "config";

const redisConfig = config.get("redis");

@Module({
  imports: [
    CacheModule.register({
      store: redisCacheStore,
      host: process.env.REDIS_HOST || redisConfig.host,
      port: parseInt(process.env.REDIS_PORT) || redisConfig.port,
      password: process.env.REDIS_PASSWORD || redisConfig.password || undefined,
      isGlobal: true,
      ttl: process.env.REDIS_TTL || redisConfig.ttl || 60,
    }),
  ],
})

export class CacheRedisModule {}