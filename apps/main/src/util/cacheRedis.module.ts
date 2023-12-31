import { Module } from "@nestjs/common";
import { CacheModule } from "@nestjs/cache-manager";
import * as redisCacheStore from "cache-manager-ioredis";
import { DB_CONFIG } from "@config/config.interface";

@Module({
  imports: [
    CacheModule.register({
      store: redisCacheStore,
      host: process.env.REDIS_HOST || DB_CONFIG.cache.host,
      port: parseInt(process.env.REDIS_PORT) || DB_CONFIG.cache.port,
      password: process.env.REDIS_PASSWORD || undefined,
      isGlobal: true,
      ttl: DB_CONFIG.cache.ttl,
    }),
  ],
})
export class CacheRedisModule {}
