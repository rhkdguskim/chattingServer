
import {User} from "../entity/users.entity";
import {
    CreateUserRequest,
    LoginUserRequest,
    LoginUserResponse, UpdateUserRequest,
    UserResponse
} from "@app/authentication/dto/authenticaion.dto";

export interface AuthenticationController {
    signIn(payload: LoginUserRequest): Promise<LoginUserResponse>;

    signUp(payload: CreateUserRequest): Promise<UserResponse>;

    updateUser(payload: UpdateUserRequest): Promise<User | boolean>;

    deleteUser(payload: number): Promise<any>;

    findUser(payload: number): Promise<User>;

    findAllUsers(): Promise<User[]>;
}