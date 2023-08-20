import {
    CallHandler,
    ExecutionContext,
    Inject,
    Injectable,
    Logger,
    LoggerService,
  } from '@nestjs/common';
  import { Request } from 'express';
  import { Observable, tap } from 'rxjs';
  import { CacheInterceptor } from '@nestjs/cache-manager';
import { CACHE_EVICT_METADATA } from './cache.constants';
  
  @Injectable()
  export class HttpCacheInterceptor extends CacheInterceptor {
    @Inject(Logger)
    private readonly logger: LoggerService

    private readonly CACHE_EVICT_METHODS = [
      'POST', 'PATCH', 'PUT', 'DELETE'
    ];
  
    async intercept(
      context: ExecutionContext,
      next: CallHandler<any>,
    ): Promise<Observable<any>> {
      const req = context.switchToHttp().getRequest<Request>();
      const evictKeys = this.reflector.getAllAndMerge(CACHE_EVICT_METADATA, [
        context.getClass(),
        context.getHandler(),
      ]);
      if (this.CACHE_EVICT_METHODS.includes(req.method)) {
        // 캐시 무효화 처리
        return next.handle().pipe(tap(() =>  {
          this.logger.log(`캐시 무효화 ${req.originalUrl}`,`${context.getClass().name}.${context.getHandler().name}`)
          if (evictKeys.length > 0) {
            evictKeys.forEach( (keys : string) => {
              this.logger.log(`캐시 무효화 ${keys}`,`${context.getClass().name}.${context.getHandler().name}`)
              this._clearCaches(keys)
            })
          }
          else {
            this._clearCaches(req.originalUrl)
          }
        }));
      }
      // 기존 캐싱 처리
      this.logger.log(`Caching Request ${req.originalUrl}`,`${context.getClass().name}.${context.getHandler().name}`)
      return super.intercept(context, next);
    }
  
    /**
     * @param cacheKeys 삭제할 캐시 키 목록
     */
    private async _clearCaches(cacheKeys: string): Promise<boolean> {
      return this.cacheManager.del(cacheKeys);
  }
}