import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";

import { Request } from "express";
import {AuthorizationService} from "@app/authorization/providers/authorization.service.interface";
import {AUTHORIZATION_SERVICE} from "@app/authorization/authorization.metadata";


@Injectable()
export class JwtGuard implements CanActivate {
  constructor(
    @Inject(AUTHORIZATION_SERVICE)
    private authService: AuthorizationService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
      const request: Request = context.switchToHttp().getRequest();

      const authToken: string = request.headers["authentication"] as string;

      if (!authToken && typeof authToken !== "string") {
        throw new UnauthorizedException("토큰이 만료되었습니다.");
      }
      request.user = this.authService.verify(authToken);

      return true;
  }
}
