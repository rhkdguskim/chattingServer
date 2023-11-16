import { LoginUserRequest, CreateUserRequest, UpdateUserRequest } from "@app/common/dto";
import { User } from "@app/common/entity/users.entity";
import { AUTHENTICATION_SERVICE, AuthenticationController, AuthenticationService } from "./authentication.interface";
import { Controller, Get, Inject } from "@nestjs/common";

@Controller('auth')
export class AuthenticationControllerImpl implements AuthenticationController {
    constructor(@Inject(AUTHENTICATION_SERVICE) private readonly authenticationService : AuthenticationService) {}

    @Get('login')
    signIn(payload: LoginUserRequest): Promise<User> {
        return this.authenticationService.signIn(payload)
    }

    @Get('signup')
    signUp(payload: CreateUserRequest): Promise<User> {
        return this.authenticationService.signUp(payload);
    }

    update(payload: UpdateUserRequest): Promise<boolean | User> {
        return this.authenticationService.update(payload);
    }
    delete(payload: number): Promise<any> {
        return this.authenticationService.delete(payload);
    }
    findOne(payload: number): Promise<User> {
        return this.authenticationService.findOne(payload);
    }
    findOneByID(payload: string): Promise<User> {
        return this.authenticationService.findOneByID(payload);
    }
    findAll(): Promise<User[]> {
        return this.authenticationService.findAll();
    }

}