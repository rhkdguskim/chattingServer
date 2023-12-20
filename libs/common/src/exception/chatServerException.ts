/*
https://docs.nestjs.com/exception-filters#custom-exceptions
*/

export enum ChatServerExceptionCode {
  Database = 0,
  Authentication = 1,
  Authorization = 2,
  NotFound = 3,
  Already_Exist = 4,
  Forbidden = 5,
}

export interface CustomExceptionMessage {
  message: string;
  code: ChatServerExceptionCode;
}

export class ChatServerException extends Error {
  private readonly msg: CustomExceptionMessage;
  private readonly code: ChatServerExceptionCode;
  constructor(msg: CustomExceptionMessage) {
    super();
    this.msg = msg;
    this.code = msg.code;
  }

  getMessage(): string {
    return this.msg.message;
  }

  getError(): CustomExceptionMessage {
    return this.msg;
  }

  getCode(): ChatServerExceptionCode {
    return this.msg.code;
  }
}
