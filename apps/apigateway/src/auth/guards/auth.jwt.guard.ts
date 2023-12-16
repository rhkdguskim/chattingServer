import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
  Logger,
  UnauthorizedException,
} from "@nestjs/common";

import { AUTHORIZATION_SERVICE } from "@app/common/message/authorization";
import { Request } from "express";
import { AuthorizationService } from "apps/authorization/src/authorization.interface";
import {AuthenticationService} from "../../../../authentication/src/providers/authenticationservice.interface";
import {AUTHENTICATION_SERVICE} from "../../../../authentication/src/authentication.metadata";

@Injectable()
export class JwtGuard implements CanActivate {
  constructor(
    @Inject(Logger) private logger: Logger,
    @Inject(AUTHORIZATION_SERVICE)
    private authorizationClient: AuthorizationService,
    @Inject(AUTHENTICATION_SERVICE)
    private authenticationClient: AuthenticationService
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    try {
      const request: Request = context.switchToHttp().getRequest();

      const authToken: string = request.headers["authentication"] as string;

      if (!authToken && typeof authToken !== "string") {
        this.logger.error("토큰이 존재하지 않거나 올바르지 않는 토큰입니다.");
        throw new UnauthorizedException("토큰이 만료되었습니다.");
      }

      const payload = await this.authorizationClient.verify(authToken);

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
