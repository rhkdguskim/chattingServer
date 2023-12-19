/*
https://docs.nestjs.com/exception-filters#exception-filters-1
*/

import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
  Logger,
  LoggerService,
  RpcExceptionFilter,
} from "@nestjs/common";
import {ChatServerException, ChatServerExceptionCode} from "./chatServerException";
import {Observable, throwError} from "rxjs";

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
      case ChatServerExceptionCode.AUTHORIZATION:
      {
        status = HttpStatus.UNAUTHORIZED
        break
      }
      case ChatServerExceptionCode.AUTHENTICATION:
      {
        status = HttpStatus.UNAUTHORIZED
        break
      }
      case ChatServerExceptionCode.NOT_FOUND:
      {
        status = HttpStatus.NOT_FOUND
        break;
      }
      case ChatServerExceptionCode.ALREADY_EXIST:
      {
        status = HttpStatus.CONFLICT
        break;
      }
      case ChatServerExceptionCode.FORBIDDEN:
      {
        status = HttpStatus.FORBIDDEN
        break;
      }
      default:
      {
        status = HttpStatus.INTERNAL_SERVER_ERROR
        break;
      }
    }
    Logger.error(exception.getError())

    response
        .status(status)
        .json({
          statusCode: status,
          message: exception.getMessage(),
        });
  }
}
