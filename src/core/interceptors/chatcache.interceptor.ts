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
  import { Observable, tap, of } from 'rxjs';
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
        
    // 웹소켓 요청 확인 ( 최근 채팅메세지 1000개가 캐싱이 된다. )
    if (context.getType() === 'ws') {
        return next.handle().pipe(
          tap((data) => {
            const { room_id, id } = data;
            redisClient.zadd(`room:${room_id}`, id, JSON.stringify(data));
            redisClient.zremrangebyrank(`room:${room_id}`, 0, -1001);
            redisClient.expire(`room:${room_id}`, 3600);  // TTL 설정 (새로운 채팅 메세지가 추가되면 다시 사용될 가능성이 높음)
          })
        );
      }
      
      // REST API 요청
      const request = context.switchToHttp().getRequest();

      if (request.method === 'GET' && request.params.id) {
        const id = Number(request.params.id);
        const cursor = request.query.cursor !== "null" ? Number(request.query.cursor) : null;
        
        let chatList = [];
      
        
        // cursor가 null이면, 최근 50개의 채팅을 가져옵니다.
        if (!cursor) {
          chatList = await redisClient.zrevrange(`room:${id}`, 0, 49);
        } else {
          // 그렇지 않은 경우에는 cursor를 기반으로 50개의 채팅을 가져옵니다.
          chatList = await redisClient.zrevrangebyscore(`room:${id}`, (cursor-1), '-inf', 'LIMIT', 0, 50);
        }
      
        if (chatList && chatList.length > 49) {
            this.logger.log(`Redis에서 채팅내용을 불러옵니다. RoomID : ${id}`)
          chatList = chatList.map(chat => JSON.parse(chat));
          return of(chatList.reverse());
        }
      }
      // 해당 자료가 없다면 db 에서 조회 합니다.
      return next.handle();
    }
  }