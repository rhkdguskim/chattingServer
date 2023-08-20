import {
    CallHandler,
    ExecutionContext,
    Inject,
    Injectable,
    Logger,
    LoggerService,
    NestInterceptor,
  } from '@nestjs/common';
  import { Request } from 'express';
  import { Observable, tap } from 'rxjs';
  import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cluster } from 'ioredis';
import { ResponseMessage } from 'src/chatting/dto/chatting.message.dto';
  
  @Injectable()
  export class ChatCacheInterceptor implements NestInterceptor {
    constructor(
        @Inject(CACHE_MANAGER)
        private readonly cacheManager: any, // IORedis.Redis 타입으로 주입받음
        @Inject(Logger)
        private readonly logger : LoggerService,
    )
    {}
    async intercept(
        context: ExecutionContext,
        next: CallHandler<any>,
      ): Promise<Observable<any>> {
        const redisClient: Cluster = await this.cacheManager.store.getClient();
        return next.handle().pipe(tap((data : ResponseMessage) => {
            const {room_id, message ,id} = data
            this.logger.log(`room:${room_id} {${message}}`);
            redisClient.zadd(`room:${room_id}`,id, message)
        }))
    }
  }