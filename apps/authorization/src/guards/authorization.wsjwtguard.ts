import {CanActivate, ExecutionContext, Injectable} from "@nestjs/common";
import {WsException} from "@nestjs/websockets";
import {Socket} from "socket.io";
import {JwtService} from "@nestjs/jwt";
import * as config from "config";
import {UsersService} from "@src/users/users.service";

const jwtConstants = config.get("jwt");

@Injectable()
export class WsJwtGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private userService: UsersService
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    try {
      const client: Socket = context.switchToWs().getClient<Socket>();
      const authToken = client.handshake?.query?.token as string;

      if (!authToken) {
        return false;
      }

      const payload = await this.jwtService.verifyAsync(authToken, {
        secret: jwtConstants.secret,
      });
      client.data.user = await this.userService.findOne(payload.id);
      return true;
    } catch (err) {
      throw new WsException(err.message);
    }
  }
}
