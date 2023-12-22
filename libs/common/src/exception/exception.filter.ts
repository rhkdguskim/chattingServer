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
import {
  ChatServerException,
  ChatServerExceptionCode,
} from "./chatServerException";
import { Observable, throwError } from "rxjs";

@Catch(ChatServerException)
export class RcpExceptionsFilter
  implements RpcExceptionFilter<ChatServerException>
{
  constructor(private readonly logger: LoggerService) {}
  catch(exception: ChatServerException, host: ArgumentsHost): Observable<any> {
    this.logger.error(exception.getMessage());
    return throwError(() => exception.getError());
  }
}

@Catch(ChatServerException)
export class CustomExceptionFilter implements ExceptionFilter {
  catch(exception: ChatServerException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    let status: HttpStatus;

    switch (exception.getCode()) {
      case ChatServerExceptionCode.Authorization: {
        status = HttpStatus.UNAUTHORIZED;
        break;
      }
      case ChatServerExceptionCode.Authentication: {
        status = HttpStatus.UNAUTHORIZED;
        break;
      }
      case ChatServerExceptionCode.NotFound: {
        status = HttpStatus.NOT_FOUND;
        break;
      }
      case ChatServerExceptionCode.Already_Exist: {
        status = HttpStatus.CONFLICT;
        break;
      }
      case ChatServerExceptionCode.Invalid: {
        status = HttpStatus.CONFLICT;
        break;
      }
      case ChatServerExceptionCode.Forbidden: {
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
    return new ChatServerException({
      code: ChatServerExceptionCode.Database,
      message: exception.message,
    });
  }
}
