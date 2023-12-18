import {UsersController} from "@app/authentication/controller/authentication.controller.interface";
import {MessagePattern} from "@nestjs/microservices";
import {
    DELETE_USER, FIND_ALL_USER,
    FIND_ONE_BY_ID_USER,
    FIND_ONE_USER,
    SIGN_UP,
    UPDATE_USER
} from "@app/authentication/authentication.message";
import {CreateUserRequest, UpdateUserRequest, UserInfoResponse} from "@app/authentication/dto/authenticaion.dto";
import {UserEntity} from "@app/authentication/entity/users.entity";
import {Controller, Inject} from "@nestjs/common";
import {AUTHENTICATION_SERVICE} from "@app/authentication/authentication.metadata";
import {AuthenticationService} from "@app/authentication/providers/authentication.service.interface";

@Controller()
export class UsersMicroServiceController implements UsersController {
    constructor(
        @Inject(AUTHENTICATION_SERVICE)
        private readonly authenticationService: AuthenticationService
    ) {}

    @MessagePattern({ cmd: SIGN_UP })
    async signUp(payload: CreateUserRequest): Promise<UserInfoResponse> {
        return await this.authenticationService.signUp(payload);
    }

    @MessagePattern({ cmd: UPDATE_USER })
    async updateUser(payload: UpdateUserRequest): Promise<void> {
        await this.authenticationService.update(payload);
    }

    @MessagePattern({ cmd: DELETE_USER })
    async deleteUser(payload: number): Promise<void> {
        await this.authenticationService.delete(payload);
    }

    @MessagePattern({ cmd: FIND_ONE_USER })
    async findUser(payload: number): Promise<UserInfoResponse> {
        return await this.authenticationService.findOne(payload);
    }

    @MessagePattern({ cmd: FIND_ONE_BY_ID_USER })
    async findUserByID(payload: string): Promise<UserInfoResponse> {
        return await this.authenticationService.findOneByID(payload);
    }

    @MessagePattern({ cmd: FIND_ALL_USER })
    async findAllUsers(): Promise<UserInfoResponse[]> {
        return await this.authenticationService.findAll();
    }
}