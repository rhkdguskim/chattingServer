import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { Observable } from 'rxjs';
import {Role} from "@app/authentication/entity/users.entity";
import {CustomException, ExceptionType} from "@app/common/exception/custom.exception";

@Injectable()
export class SelfGuard implements CanActivate {
    canActivate(
        context: ExecutionContext,
    ): boolean | Promise<boolean> | Observable<boolean> {
        const request = context.switchToHttp().getRequest();
        const user = request.user;
        const userId = request.params.id;

        if (!userId) {
            return true;
        }

        if (user.role == Role.ADMIN) {
            return true;
        }

        if (user && user.id === Number(userId)) {
            return true;
        }
        throw new CustomException({
            code: ExceptionType.AUTHORIZATION, message: `You can only access your own data`
        });
    }
}