import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { Socket } from "socket.io";
import { TokenInfoResponse } from "@app/authorization/dto/authorization.dto";

export const GetUser = createParamDecorator(
  (data, ctx: ExecutionContext): TokenInfoResponse => {
    const req = ctx.switchToHttp().getRequest();
    return req.user;
  }
);

export const GetOAuthData = createParamDecorator(
  (data, ctx: ExecutionContext): TokenInfoResponse => {
    const req = ctx.switchToHttp().getRequest();
    return req.user;
  }
);

export const GetWsUser = createParamDecorator(
  (data, ctx: ExecutionContext): TokenInfoResponse => {
    const client: Socket = ctx.switchToWs().getClient<Socket>();
    return client.data.user;
  }
);

export const GetWsUserID = createParamDecorator(
  (data, ctx: ExecutionContext): number => {
    const client: Socket = ctx.switchToWs().getClient<Socket>();
    return client.data.user.id;
  }
);
