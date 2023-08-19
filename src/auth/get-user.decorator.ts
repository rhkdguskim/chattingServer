import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { User } from "../users/users.entity";
import { Socket } from "socket.io";

export const GetUser = createParamDecorator(
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
