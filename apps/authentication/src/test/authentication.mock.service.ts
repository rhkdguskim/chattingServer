import { LoginUserRequest, CreateUserRequest, UpdateUserRequest } from "@app/common/dto";
import { User } from "@app/common/entity/users.entity";
import { AuthenticationService, USER_REPOSITORY, UserRepository } from "apps/authentication/src/authentication.interface";
import { Inject } from "@nestjs/common";

export class AuthenticationMockService implements AuthenticationService {
    constructor(@Inject(USER_REPOSITORY)
    private userRepository: UserRepository) {
        
    }
    async signIn(loginUser: LoginUserRequest): Promise<User> {
        return await this.userRepository.findOne(loginUser.user_id);
    }

    signUp(createUserDto: CreateUserRequest): Promise<User> {
        throw new Error("Method not implemented.");
    }
    update(payload: UpdateUserRequest): Promise<boolean | User> {
        throw new Error("Method not implemented.");
    }
    delete(payload: number): Promise<any> {
        throw new Error("Method not implemented.");
    }
    async findOne(id: number): Promise<User> {
        return await this.userRepository.findOne(id);
    }
    findOneByID(user_id: string): Promise<User> {
        throw new Error("Method not implemented.");
    }
    findAll(): Promise<User[]> {
        throw new Error("Method not implemented.");
    }

}