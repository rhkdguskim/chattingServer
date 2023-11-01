import { LoginUserResponse, LoginUserRequest, CreateUserRequest, NewTokenRequest, OAuthRequest } from "@app/common/dto/users.dto";
import { User } from "@app/common/entity";
import {  OAUTH_SIGN_IN, SIGN_IN, SIGN_UP } from "@app/common/message/authentication";
import { ClientTCP } from "@nestjs/microservices";
import { lastValueFrom } from "rxjs";

export class AuthenticationTCPClient extends ClientTCP {

    async SignIn(payload : LoginUserRequest) : Promise<User> {
        return await lastValueFrom<User>(this.send<User>({cmd :SIGN_IN}, payload));
    }

    async SignUp(payload : CreateUserRequest) : Promise<User> {
        return await lastValueFrom<User> (this.send<User>({cmd :SIGN_UP}, payload));
    }

    async OAuthLogin(payload : OAuthRequest) : Promise<LoginUserResponse> {
        return lastValueFrom(this.send<LoginUserResponse>({cmd :OAUTH_SIGN_IN}, payload));
    }
}