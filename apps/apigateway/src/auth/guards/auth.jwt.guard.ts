import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
  Logger,
  UnauthorizedException,
} from "@nestjs/common";
import { AUTHENTICATION_SERVICE } from "apps/authentication/src/authentication.message";
import { AUTHORIZATION_SERVICE } from "@app/common/message/authorization";
import { Request } from "express";
import { IAuthorizaionClient } from "@app/common/clients/authorization.interface.client";
import { AuthenticationClient } from "apps/authentication/src/authentication.interface";

@Injectable()
export class JwtGuard implements CanActivate {
  constructor(
    @Inject(Logger) private logger: Logger,
    @Inject(AUTHORIZATION_SERVICE)
    private authorizationClient: IAuthorizaionClient,
    @Inject(AUTHENTICATION_SERVICE)
    private authenticationClient: AuthenticationClient
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    try {
      const request: Request = context.switchToHttp().getRequest();

      const authToken: string = request.headers["authentication"] as string;

      if (!authToken && typeof authToken !== "string") {
        this.logger.error("토큰이 존재하지 않거나 올바르지 않는 토큰입니다.");
        return false;
      }

      const payload = await this.authorizationClient.Verify(authToken);

      request.user = await this.authenticationClient.findOneByID(
        payload.user_id
      );

      return true;
    } catch (err) {
      this.logger.error(err);
      throw new UnauthorizedException(err.message);
    }
  }
}
