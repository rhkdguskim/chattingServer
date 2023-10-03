import {CanActivate, ExecutionContext, Inject, Injectable, Logger, UnauthorizedException} from "@nestjs/common";
import {
    AUTHENTICATION_SERVICE,
    FIND_ONE_BY_ID_USER,
} from "@app/common/message/authentication";
import {AUTHORIZATION_SERVICE, JWT_SIGN, JWT_VERIFY} from "@app/common/message/authorization";
import {ClientProxy} from "@nestjs/microservices";
import {lastValueFrom} from "rxjs";
import {User} from "@app/common/entity";
import {Request} from "express";

@Injectable()
export class JwtGuard implements CanActivate {
    constructor(
        @Inject(Logger) private logger : Logger,
        @Inject(AUTHORIZATION_SERVICE)
        private authorizationClient : ClientProxy,
        @Inject(AUTHENTICATION_SERVICE)
        private authenticationClient : ClientProxy,
    ) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        try {
            const request : Request = context.switchToHttp().getRequest()
            const authToken = request.headers['authentication']
            if (!authToken) {
                this.logger.error('토큰이 존재하지 않습니다.')
                return false;
            }
            const payload : any = await lastValueFrom(this.authorizationClient.send({cmd:JWT_VERIFY}, authToken));
            //this.logger.debug(payload)
            request.user =  await lastValueFrom(this.authenticationClient.send({cmd:FIND_ONE_BY_ID_USER}, payload.user_id))
            return true;
        } catch (err) {
            throw new UnauthorizedException(err.message);
        }
    }
}