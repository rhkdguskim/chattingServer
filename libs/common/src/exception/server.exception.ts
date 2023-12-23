/*
https://docs.nestjs.com/exception-filters#custom-exceptions
*/

export enum ServerExceptionCode {
  Database = 0,
  Authentication = 1,
  Authorization = 2,
  NotFound = 3,
  Already_Exist = 4,
  Forbidden = 5,
  Invalid = 6,
}

export interface ExceptionMessage {
  message: string;
  code: ServerExceptionCode;
}

export class ServerException extends Error {
  private readonly msg: ExceptionMessage;
  private readonly code: ServerExceptionCode;
  constructor(msg: ExceptionMessage) {
    super();
    this.msg = msg;
    this.code = msg.code;
  }

  getMessage(): string {
    return this.msg.message;
  }

  getError(): ExceptionMessage {
    return this.msg;
  }

  getCode(): ServerExceptionCode {
    return this.msg.code;
  }
}
