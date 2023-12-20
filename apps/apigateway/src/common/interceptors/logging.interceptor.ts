import {
  CallHandler,
  ExecutionContext,
  Injectable,
  LoggerService,
  NestInterceptor,
} from "@nestjs/common";
import { Observable, tap } from "rxjs";

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  constructor(
    private readonly logger: LoggerService // LoggerService 주입
  ) {}
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>
  ): Observable<any> | Promise<Observable<any>> {
    const request = context.switchToHttp().getRequest();
    const response = context.switchToHttp().getResponse();
    const { method, url, params, body, ip } = request;

    this.logger.log(
      `Start`,
      `${context.getClass().name}.${context.getHandler().name}`
    );
    const now = Date.now();

    this.logger.debug(
      `Request ${method} ${url}`,
      `${context.getClass().name}.${context.getHandler().name}`
    );
    this.logger.debug(
      `Request Params : ${JSON.stringify(params)}`,
      `${context.getClass().name}.${context.getHandler().name}`
    );
    this.logger.debug(
      `Request Body: ${JSON.stringify(body)}`,
      `${context.getClass().name}.${context.getHandler().name}`
    );

    return next.handle().pipe(
      tap((responseData) => {
        this.logger.debug(
          `Response : ${JSON.stringify(responseData)}`,
          `${context.getClass().name}.${context.getHandler().name}`
        );

        this.logger.log(
          `End: Time : {${Date.now() - now} ms}`,
          `${context.getClass().name}.${context.getHandler().name}`
        );
      })
    );
  }
}
