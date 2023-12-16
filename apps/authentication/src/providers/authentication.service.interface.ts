import {User} from "../entity/users.entity";
import {CreateUserRequest, LoginUserRequest, UpdateUserRequest} from "@app/authentication/dto/authenticaion.dto";

export interface AuthenticationService {
    signIn(loginUser: LoginUserRequest): Promise<User>;

    signUp(createUserDto: CreateUserRequest): Promise<User>;

    update(payload: UpdateUserRequest): Promise<User | boolean>;

    delete(payload: number): Promise<any>;

    findOne(id: number): Promise<User>;

    findOneByID(user_id: string): Promise<User | null>;

    findAll(): Promise<User[]>;
}