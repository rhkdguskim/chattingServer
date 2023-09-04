import {
    CallHandler,
    ExecutionContext,
    Inject,
    Injectable,
    Logger,
    LoggerService,
    NestInterceptor,
  } from "@nestjs/common";
  import { Observable, tap, of } from "rxjs";
  import { CACHE_MANAGER } from "@nestjs/cache-manager";
  import { Cluster } from "ioredis";
  import { Reflector } from "@nestjs/core";
  
  @Injectable()
  export class ReadChatCacheInterceptor implements NestInterceptor {
    constructor(
      @Inject(CACHE_MANAGER)
      private readonly cacheManager: any, // IORedis.Redis 타입으로 주입받음
      @Inject(Logger)
      private readonly logger: LoggerService,
    ) {}
    async intercept(
      context: ExecutionContext,
      next: CallHandler<any>
    ): Promise<Observable<any>> {
      const redisClient: Cluster = await this.cacheManager.store.getClient();
  
        const request = context.switchToHttp().getRequest();
        if (request.method === "GET" && request.params.id) {
        const id = Number(request.params.id);
        const cursor =
            request.query.cursor !== "null"
            ? Number(request.query.cursor)
            : null;

        let chatList = [];

        // cursor가 null이면, 최근 50개의 채팅을 가져옵니다.
        if (!cursor) {
            chatList = await redisClient.zrevrange(`room:${id}`, 0, 49);
        } else {
            // 그렇지 않은 경우에는 cursor를 기반으로 50개의 채팅을 가져옵니다.
            chatList = await redisClient.zrevrangebyscore(
            `room:${id}`,
            cursor - 1,
            "-inf",
            "LIMIT",
            0,
            50
            );
        }
        if (chatList && chatList.length > 49) {
            this.logger.log(`Redis에서 채팅내용을 불러옵니다. RoomID : ${id}`);
            chatList = chatList.map((chat) => JSON.parse(chat));
            return of(chatList.reverse());
        }
        }
        // 해당 자료가 없다면 db 에서 조회 합니다.
        return next.handle();
    }
  }
  