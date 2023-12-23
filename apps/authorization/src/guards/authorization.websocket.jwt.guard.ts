import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
} from "@nestjs/common";
import { WsException } from "@nestjs/websockets";
import { Socket } from "socket.io";
import { AUTHORIZATION_SERVICE } from "@app/authorization/authorization.metadata";
import { AuthorizationService } from "@app/authorization/providers/authorization.service.interface";

@Injectable()
export class WebSocketJwtGuard implements CanActivate {
  constructor(
    @Inject(AUTHORIZATION_SERVICE)
    private authService: AuthorizationService
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    try {
      const client: Socket = context.switchToWs().getClient<Socket>();
      const authToken = client.handshake?.query?.token as string;

      if (!authToken) {
        return false;
      }
      client.data.user = await this.authService.verify(authToken);

      return true;
    } catch (err) {
      throw new WsException(err.message);
    }
  }
}
