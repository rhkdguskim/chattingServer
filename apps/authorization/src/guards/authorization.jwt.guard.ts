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
import {CustomException, ExceptionType} from "@app/common/exception/custom.exception";


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
          throw new CustomException({
              code: ExceptionType.AUTHORIZATION, message: `Token is NULL`
          });
      }
      try {
          request.user = await this.authService.verify(authToken);
      } catch (e) {
          throw new CustomException({
              code: ExceptionType.AUTHORIZATION, message: `Invalided Token`
          });
      }
      return true;
  }
}
