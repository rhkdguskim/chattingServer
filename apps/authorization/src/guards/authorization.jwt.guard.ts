import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
  Logger,
  UnauthorizedException,
} from "@nestjs/common";

import { Request } from "express";
import {AuthenticationService} from "@app/authentication/providers/authentication.service.interface";
import {AUTHENTICATION_SERVICE} from "@app/authentication/authentication.metadata";
import {AuthorizationService} from "../providers/authorization.service.interface";
import {AUTHORIZATION_SERVICE} from "../authorization.metadata";


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
  }
}
