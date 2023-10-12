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
import { ResponseMessage } from "@app/common/dto/chatting.dto";
import { Reflector } from "@nestjs/core";

@Injectable()
export class SendMessageCacheInterceptor implements NestInterceptor {
  constructor(
    @Inject(CACHE_MANAGER)
    private readonly cacheManager: any, // IORedis.Redis 타입으로 주입받음
    @Inject(Logger)
    private readonly logger: LoggerService,
    private readonly reflector: Reflector
  ) {}
  async intercept(
    context: ExecutionContext,
    next: CallHandler<any>
  ): Promise<Observable<any>> {
    const redisClient: Cluster = await this.cacheManager.store.getClient();
    return next.handle().pipe(
      tap((data: ResponseMessage) => {
        const { room_id, id } = data;
        redisClient.zadd(`room:${room_id}`, id, JSON.stringify(data));
        redisClient.zremrangebyrank(`room:${room_id}`, 0, -1001);
        redisClient.expire(`room:${room_id}`, 3600); // TTL 설정 (새로운 채팅 메세지가 추가되면 다시 사용될 가능성이 높음)
      })
    );
  }
}
