import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { Socket } from "socket.io";
import { User } from "@app/common/entity";

export const GetUser = createParamDecorator(
  (data, ctx: ExecutionContext): User => {
    const req = ctx.switchToHttp().getRequest();
    return req.user;
  }
);

export const GetOAuthData = createParamDecorator(
  (data, ctx: ExecutionContext): User => {
    const req = ctx.switchToHttp().getRequest();
    return req.user;
  }
);

export const GetWsUser = createParamDecorator(
  (data, ctx: ExecutionContext): User => {
    const client: Socket = ctx.switchToWs().getClient<Socket>();
    return client.data.user;
  }
);
