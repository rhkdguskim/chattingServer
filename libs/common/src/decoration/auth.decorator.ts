import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { Socket } from "socket.io";
import {JWTResponse} from "@app/authorization/dto/authorization.dto";


export const GetUser = createParamDecorator(
  (data, ctx: ExecutionContext): JWTResponse => {
    const req = ctx.switchToHttp().getRequest();
    return req.user;
  }
);

export const GetOAuthData = createParamDecorator(
  (data, ctx: ExecutionContext): JWTResponse => {
    const req = ctx.switchToHttp().getRequest();
    return req.user;
  }
);

export const GetWsUser = createParamDecorator(
  (data, ctx: ExecutionContext): JWTResponse => {
    const client: Socket = ctx.switchToWs().getClient<Socket>();
    return client.data.user;
  }
);
