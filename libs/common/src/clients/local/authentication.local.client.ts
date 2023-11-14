import { LoginUserRequest, CreateUserRequest, UpdateUserRequest } from "@app/common/dto";
import { UserTypeORM } from "@app/common/entity/typeorm";
import { IAuthenticationClient } from "../authenication.interface.client";
import { Inject } from "@nestjs/common";
import { AUTHENTICATION_SERVICE } from "@app/common/message/authentication";
import { AuthenticationService } from "apps/authentication/src/authentication.service";

export class AuthenticationLocalClient implements IAuthenticationClient {
    constructor(@Inject(AUTHENTICATION_SERVICE) private service : AuthenticationService) {}
    SignIn(payload: LoginUserRequest): Promise<UserTypeORM> {
        return this.service.signIn(payload);
    }
    SignUp(payload: CreateUserRequest): Promise<UserTypeORM> {
        throw new Error("Method not implemented.");
    }
    update(payload: UpdateUserRequest): Promise<UserTypeORM> {
        throw new Error("Method not implemented.");
    }
    delete(payload: number): Promise<UserTypeORM> {
        throw new Error("Method not implemented.");
    }
    findOne(payload: number): Promise<UserTypeORM> {
        throw new Error("Method not implemented.");
    }
    findOneByID(payload: string): Promise<UserTypeORM> {
        throw new Error("Method not implemented.");
    }
    findAll(): Promise<UserTypeORM[]> {
        throw new Error("Method not implemented.");
    }

}