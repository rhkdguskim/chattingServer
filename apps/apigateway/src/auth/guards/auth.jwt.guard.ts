import {CanActivate, ExecutionContext, Inject, Injectable, UnauthorizedException} from "@nestjs/common";
import {AUTHENTICATION_SERVICE, AUTHORIZATION_SERVICE, FIND_ONE_USER, JWT_SIGN} from "@app/common/constant";
import {ClientProxy} from "@nestjs/microservices";
import {lastValueFrom} from "rxjs";
import {User} from "@app/common/entity";
import {Request} from "express";

@Injectable()
export class JwtGuard implements CanActivate {
    constructor(
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
                return false;
            }

            const payload : any = await lastValueFrom(this.authorizationClient.send({cmd:JWT_SIGN}, authToken));
            request.user = await lastValueFrom(this.authenticationClient.send({cmd:FIND_ONE_USER}, payload.id))
            return true;
        } catch (err) {
            throw new UnauthorizedException(err.message);
        }
    }
}