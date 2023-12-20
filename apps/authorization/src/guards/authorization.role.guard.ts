import {
  CanActivate,
  ExecutionContext,
  Injectable,
  SetMetadata,
} from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Role } from "@app/authentication/entity/users.entity";
import {
  ChatServerException,
  ChatServerExceptionCode,
} from "@app/common/exception/chatServerException";

export const ROLES_KEY = "roles";
export const Roles = (roles: Role) => SetMetadata(ROLES_KEY, roles);

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.get<Role>(
      ROLES_KEY,
      context.getHandler()
    );

    if (requiredRoles == null) {
      return true;
    }

    const { user } = context.switchToHttp().getRequest();

    if (requiredRoles >= user.role) {
      return true;
    }

    throw new ChatServerException({
      code: ChatServerExceptionCode.Authorization,
      message: `You can only access Auth : ${Role[user.role]}`,
    });
  }
}
