import {
    CallHandler,
    ExecutionContext,
    Injectable,
  } from '@nestjs/common';
  import { Request } from 'express';
  import { Cluster } from 'ioredis';
  import { Observable, tap } from 'rxjs';
  import { CacheInterceptor } from '@nestjs/cache-manager';
  
  @Injectable()
  export class HttpCacheInterceptor extends CacheInterceptor {
    private readonly CACHE_EVICT_METHODS = [
      'POST', 'PATCH', 'PUT', 'DELETE'
    ];
  
    async intercept(
      context: ExecutionContext,
      next: CallHandler<any>,
    ): Promise<Observable<any>> {
      const req = context.switchToHttp().getRequest<Request>();
      if (this.CACHE_EVICT_METHODS.includes(req.method)) {
        // 캐시 무효화 처리
        return next.handle().pipe(tap(() => this._clearCaches(req.originalUrl as any as string[])));
      }
  
      // 기존 캐싱 처리
      return super.intercept(context, next);
    }
  
    /**
     * @param cacheKeys 삭제할 캐시 키 목록
     */
    private async _clearCaches(cacheKeys: string[]): Promise<boolean> {
      const client: Cluster = await this.cacheManager.store.getClient();
      const redisNodes = client.nodes();
  
      const result2 = await Promise.all(
        redisNodes.map(async (redis) => {
          const _keys = await Promise.all(
            cacheKeys.map((cacheKey) => redis.keys(`*${cacheKey}*`)),
          );
          const keys = _keys.flat();
          return Promise.all(keys.map((key) => !!this.cacheManager.del(key)));
        }),
      );
      return result2.flat().every((r) => !!r);
    }
  }