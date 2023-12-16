import {CreateUserRequest, LoginUserRequest, UpdateUserRequest} from "@app/common/dto";
import {User} from "../entity/users.entity";

export interface AuthenticationController {
    signIn(payload: LoginUserRequest): Promise<User>;

    signUp(payload: CreateUserRequest): Promise<User>;

    update(payload: UpdateUserRequest): Promise<User | boolean>;

    delete(payload: number): Promise<any>;

    findOne(payload: number): Promise<User>;

    findOneByID(payload: string): Promise<User | null>;

    findAll(): Promise<User[]>;
}