import {
  CallHandler,
  ExecutionContext,
  Injectable,
  Logger,
  LoggerService,
  NestInterceptor,
} from "@nestjs/common";
import { Observable, tap } from "rxjs";
import { JsonSocket } from "@nestjs/microservices";

@Injectable()
export class MicroServiceLoggingInterceptor implements NestInterceptor {
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
          `End: Time - {${Date.now() - now} ms} ${JSON.stringify(
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

export function Logging(): ClassDecorator {
  return function (constructor: Function) {
    // 클래스의 모든 메서드에 대해 순회
    Object.getOwnPropertyNames(constructor.prototype).forEach((methodName) => {
      // 생성자 함수는 제외
      if (methodName === "constructor") {
        return;
      }

      const descriptor = Object.getOwnPropertyDescriptor(
        constructor.prototype,
        methodName
      );
      if (descriptor && typeof descriptor.value === "function") {
        const originalMethod = descriptor.value;
        descriptor.value = async function (...args: any[]) {
          Logger.verbose(
            `Request : ${JSON.stringify(args)}`,
            `${constructor.name}.${methodName}`
          );
          try {
            const result = await originalMethod.apply(this, args);
            Logger.verbose(
              `Response : ${JSON.stringify(result)}`,
              `${constructor.name}.${methodName}`
            );
            return result;
          } catch (e) {
            Logger.error(e);
            throw e;
          }
        };

        Object.defineProperty(constructor.prototype, methodName, descriptor);
      }
    });
  };
}
