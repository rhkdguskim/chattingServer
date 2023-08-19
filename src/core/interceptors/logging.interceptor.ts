import { CallHandler, ExecutionContext, Injectable, LoggerService, NestInterceptor } from "@nestjs/common";
import { Observable, tap } from "rxjs";

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
    constructor(
        private readonly logger: LoggerService, // LoggerService 주입
        ) {

    }
    intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> | Promise<Observable<any>> {
        this.logger.log(`Start Handler {${context.getHandler().name}}`)
        const now = Date.now()
        return next
            .handle()
            .pipe(tap(() => {
                this.logger.log(`End Handler : {${context.getHandler().name}, ${Date.now() - now} ms}`)
            }))
    }
}