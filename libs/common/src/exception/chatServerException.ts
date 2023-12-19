/*
https://docs.nestjs.com/exception-filters#custom-exceptions
*/

export enum ChatServerExceptionCode {
  AUTHENTICATION = 1,
  AUTHORIZATION = 2,
  NOT_FOUND = 3,
  ALREADY_EXIST = 4,
  FORBIDDEN = 5,
}

export interface CustomExceptionMessage {
  message: string;
  code: ChatServerExceptionCode;
}

export class ChatServerException extends Error {
  private readonly msg: CustomExceptionMessage;
  private readonly code : ChatServerExceptionCode;
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

  getCode() : ChatServerExceptionCode {
    return this.msg.code;
  }
}
