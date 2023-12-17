/*
https://docs.nestjs.com/exception-filters#custom-exceptions
*/
import { RpcException } from "@nestjs/microservices";

export enum ExceptionType {
  AUTHENTICATION_ERROR = "인증에러",
  AUTHORIZATION_ERROR = "인가에러",
}

export interface CustomExceptionMessage {
  message: string;
  code: ExceptionType;
}

export class CustomException extends Error {
  private readonly msg: CustomExceptionMessage;
  constructor(msg: CustomExceptionMessage) {
    super();
    this.msg = msg;
  }

  getMessage(): string {
    return this.msg.message;
  }

  getError(): CustomExceptionMessage {
    return this.msg;
  }
}
