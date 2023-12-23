import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
} from "@nestjs/common";

import { Request } from "express";
import { AuthorizationService } from "@app/authorization/providers/authorization.service.interface";
import { AUTHORIZATION_SERVICE } from "@app/authorization/authorization.metadata";
import {
  ServerException,
  ServerExceptionCode,
} from "@app/common/exception/server.exception";

@Injectable()
export class JwtGuard implements CanActivate {
  constructor(
    @Inject(AUTHORIZATION_SERVICE)
    private authService: AuthorizationService
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request: Request = context.switchToHttp().getRequest();

    const authToken: string = request.headers["authorization"] as string;

    if (!authToken && typeof authToken !== "string") {
      throw new ServerException({
        code: ServerExceptionCode.Authorization,
        message: `Invalid Token`,
      });
    }
    try {
      request.user = await this.authService.verify(authToken);
    } catch (e) {
      throw new ServerException({
        code: ServerExceptionCode.Authorization,
        message: `Verify Error`,
      });
    }
    return true;
  }
}
