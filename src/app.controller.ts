import { Body, Controller, Get, Inject, Logger, LoggerService, Post, UseInterceptors } from "@nestjs/common";
import { AppService } from "./app.service";
import { HttpCacheInterceptor } from "./core/interceptors/httpcache.interceptor";

@Controller()
@UseInterceptors(HttpCacheInterceptor)
export class AppController {
  constructor(private readonly appService: AppService,
              @Inject(Logger)
              private readonly logger: LoggerService
             ) {}

  @Get("")
  Test(): number {
    this.logger.log('캐싱을 하기 전입니다.')
    return 5;
  }

  @Post("")
  Test2(): number {
    this.logger.log('캐싱 무효화를 합니다.')
    return 5;
  }
}
