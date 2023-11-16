import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { Socket } from "socket.io";
import { UserTypeORM } from "@app/common/typeorm/entity";

export const GetUser = createParamDecorator(
  (data, ctx: ExecutionContext): UserTypeORM => {
    const req = ctx.switchToHttp().getRequest();
    return req.user;
  }
);

export const GetOAuthData = createParamDecorator(
  (data, ctx: ExecutionContext): UserTypeORM => {
    const req = ctx.switchToHttp().getRequest();
    return req.user;
  }
);

export const GetWsUser = createParamDecorator(
  (data, ctx: ExecutionContext): UserTypeORM => {
    const client: Socket = ctx.switchToWs().getClient<Socket>();
    return client.data.user;
  }
);
