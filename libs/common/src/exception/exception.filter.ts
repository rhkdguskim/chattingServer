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
import {CustomException, ExceptionType} from "./custom.exception";
import {Observable, throwError} from "rxjs";

@Catch(CustomException)
export class RcpExceptionsFilter
  implements RpcExceptionFilter<CustomException>
{
  constructor(private readonly logger: LoggerService) {}
  catch(exception: CustomException, host: ArgumentsHost): Observable<any> {
    this.logger.error(exception.getMessage());
    return throwError(() => exception.getError());
  }
}

@Catch(CustomException)
export class CustomExceptionFilter implements ExceptionFilter {
  catch(exception: CustomException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    let status;
    switch (exception.getCode()) {
      case ExceptionType.AUTHORIZATION:
      {
        status = HttpStatus.UNAUTHORIZED
        break
      }
      case ExceptionType.AUTHENTICATION:
      {
        status = HttpStatus.UNAUTHORIZED
        break
      }
      case ExceptionType.NOT_FOUND:
      {
        status = HttpStatus.NOT_FOUND
        break;
      }
      case ExceptionType.ALREADY_EXIST:
      {
        status = HttpStatus.CONFLICT
        break;
      }
      case ExceptionType.FORBIDDEN:
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
