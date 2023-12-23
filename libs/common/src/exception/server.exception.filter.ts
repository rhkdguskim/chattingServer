/*
https://docs.nestjs.com/exception-filters#exception-filters-1
*/

import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
  Injectable,
  Logger,
  LoggerService,
  RpcExceptionFilter,
} from "@nestjs/common";
import { ServerException, ServerExceptionCode } from "./server.exception";
import { Observable, throwError } from "rxjs";

@Catch(ServerException)
export class RcpExceptionsFilter
  implements RpcExceptionFilter<ServerException>
{
  constructor(private readonly logger: LoggerService) {}
  catch(exception: ServerException, host: ArgumentsHost): Observable<any> {
    this.logger.error(exception.getMessage());
    return throwError(() => exception.getError());
  }
}

@Catch(ServerException)
export class ServerExceptionFilter implements ExceptionFilter {
  catch(exception: ServerException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    let status: HttpStatus;

    switch (exception.getCode()) {
      case ServerExceptionCode.Authorization: {
        status = HttpStatus.UNAUTHORIZED;
        break;
      }
      case ServerExceptionCode.Authentication: {
        status = HttpStatus.UNAUTHORIZED;
        break;
      }
      case ServerExceptionCode.NotFound: {
        status = HttpStatus.NOT_FOUND;
        break;
      }
      case ServerExceptionCode.Already_Exist: {
        status = HttpStatus.CONFLICT;
        break;
      }
      case ServerExceptionCode.Invalid: {
        status = HttpStatus.CONFLICT;
        break;
      }
      case ServerExceptionCode.Forbidden: {
        status = HttpStatus.FORBIDDEN;
        break;
      }
      default: {
        status = HttpStatus.INTERNAL_SERVER_ERROR;
        break;
      }
    }
    Logger.error(exception.getError());

    response.status(status).json({
      statusCode: status,
      message: exception.getMessage(),
    });
  }
}

@Injectable()
@Catch()
export class ExceptionFilterDatabase implements ExceptionFilter {
  catch(exception: Error) {
    return new ServerException({
      code: ServerExceptionCode.Database,
      message: exception.message,
    });
  }
}
