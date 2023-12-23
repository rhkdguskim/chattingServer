import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Observable } from "rxjs";
import { Role } from "@app/user/entity/users.entity";
import {
  ServerException,
  ServerExceptionCode,
} from "@app/common/exception/server.exception";

@Injectable()
export class SelfGuard implements CanActivate {
  canActivate(
    context: ExecutionContext
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    const userId = request.params.id;

    if (!userId) {
      return true;
    }

    if (!user) {
      throw new ServerException({
        code: ServerExceptionCode.Authorization,
        message: `no User Data`,
      });
    }

    if (!user.role) {
      throw new ServerException({
        code: ServerExceptionCode.Authorization,
        message: `no Role`,
      });
    }

    if (user.role == Role.ADMIN) {
      return true;
    }

    if (user && user.id === Number(userId)) {
      return true;
    }
    throw new ServerException({
      code: ServerExceptionCode.Authorization,
      message: `You can only access your own data`,
    });
  }
}
