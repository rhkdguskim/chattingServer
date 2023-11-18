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
} from "@nestjs/common";
import { CustomException } from "./custom.exception";
import { Observable, throwError } from "rxjs";

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
