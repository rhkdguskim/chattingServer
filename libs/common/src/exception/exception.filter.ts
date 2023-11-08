/*
https://docs.nestjs.com/exception-filters#exception-filters-1
*/

import {
  Catch,
  ArgumentsHost,
  RpcExceptionFilter,
  Inject,
  Logger,
  LoggerService,
} from '@nestjs/common';
import { CustomRpcExceptionException } from './customrpcexception.exception';
import { Observable, throwError } from 'rxjs';

@Catch(CustomRpcExceptionException)
export class RcpExceptionsFilter implements RpcExceptionFilter<CustomRpcExceptionException> {
  constructor(private readonly logger: LoggerService) {}
  catch(exception: CustomRpcExceptionException, host: ArgumentsHost): Observable<any> {
    this.logger.error(exception.getMessage())
    return throwError(() => exception.getError());
  }
}
