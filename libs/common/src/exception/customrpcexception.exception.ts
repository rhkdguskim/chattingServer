/*
https://docs.nestjs.com/exception-filters#custom-exceptions
*/
import { RpcException } from '@nestjs/microservices';

export enum RpcExceptionType {
  AUTHENTICATION_ERROR = '인증에러',
  AUTHORIZAION_ERROR = '인가에러',
}

export interface CustomRpcExceptionMessage {
  message : string;
  code : RpcExceptionType;
}

export class CustomRpcExceptionException extends RpcException {
  private msg : CustomRpcExceptionMessage;
  constructor(msg :CustomRpcExceptionMessage) {
    super(msg);
    this.msg  = msg
  }
  
  getMessage() : string {
    return this.msg.message
  }
}
