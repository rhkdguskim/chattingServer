import {
  CallHandler,
  ExecutionContext,
  Injectable,
  LoggerService,
  NestInterceptor,
} from "@nestjs/common";
import { Observable, tap } from "rxjs";
import { JsonSocket } from "@nestjs/microservices";

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  constructor(private readonly logger: LoggerService) {}
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>
  ): Observable<any> | Promise<Observable<any>> {
    const request = context.switchToRpc().getContext();
    const [jsonSocket, requestData] = request.args as [JsonSocket, any];
    const remoteAddress = jsonSocket.socket.remoteAddress;
    const remotePort = jsonSocket.socket.remotePort;
    this.logger.debug(
      `Start - ${JSON.stringify(requestData)}`,
      `${context.getClass().name}.${
        context.getHandler().name
      } [${remoteAddress}:${remotePort}] ${requestData}`
    );
    const now = Date.now();
    return next.handle().pipe(
      tap((responseData) => {
        this.logger.debug(
          `End: Time : {${Date.now() - now} ms} ${JSON.stringify(
            responseData
          )}`,
          `${context.getClass().name}.${
            context.getHandler().name
          } [${remoteAddress}:${remotePort}]`
        );
      })
    );
  }
}
