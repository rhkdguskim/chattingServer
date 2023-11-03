import { LoginUserResponse, LoginUserRequest, CreateUserRequest, NewTokenRequest, OAuthRequest, UpdateUserRequest } from "@app/common/dto/users.dto";
import { User } from "@app/common/entity";
import {  DELETE_USER, FIND_ALL_USER, FIND_ONE_BY_ID_USER, FIND_ONE_USER, OAUTH_SIGN_IN, SIGN_IN, SIGN_UP, UPDATE_USER } from "@app/common/message/authentication";
import { ClientTCP } from "@nestjs/microservices";
import { lastValueFrom } from "rxjs";
import { IAuthenticationClient } from "./authenication.interface.client";

export class AuthenticationTCPClient extends ClientTCP implements IAuthenticationClient {
    async update(payload: UpdateUserRequest): Promise<User> {
        return await lastValueFrom<User>(this.send<User>({cmd :UPDATE_USER}, payload));
    }
    async delete(payload: number): Promise<User> {
        return await lastValueFrom<User>(this.send<User>({cmd :DELETE_USER}, payload));
    }
    async findOne(payload: number): Promise<User> {
        return await lastValueFrom<User>(this.send<User>({cmd :FIND_ONE_USER}, payload));
    }
    async findOneByID(payload: string): Promise<User> {
        return await lastValueFrom<User>(this.send<User>({cmd :FIND_ONE_BY_ID_USER}, payload));
    }
    async findAll(): Promise<User[]> {
        return await lastValueFrom<User[]>(this.send<User[]>({cmd :FIND_ALL_USER}, {}));
    }
    async oAuthSignIn(payload: OAuthRequest): Promise<User> {
        return await lastValueFrom<User>(this.send<User>({cmd :SIGN_IN}, payload));
    }

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