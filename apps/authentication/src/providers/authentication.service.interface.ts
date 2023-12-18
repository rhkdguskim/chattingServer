import {UserEntity} from "../entity/users.entity";
import {
    CreateUserRequest,
    LoginUserRequest, LoginUserResponse,
    UpdateUserRequest, UserInfoResponse
} from "@app/authentication/dto/authenticaion.dto";

export interface AuthenticationService {
    signIn(loginUser: LoginUserRequest): Promise<LoginUserResponse>;

    signUp(createUserDto: CreateUserRequest): Promise<UserInfoResponse>;

    update(id:number, payload: UpdateUserRequest): Promise<boolean>;

    delete(id: number): Promise<boolean>;

    findOne(id: number): Promise<UserInfoResponse>;

    findOneByID(user_id: string): Promise<UserInfoResponse | null>;

    findAll(): Promise<UserInfoResponse[]>;
}