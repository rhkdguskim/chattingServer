import { User } from "../entity/users.entity";
import { Inject } from "@nestjs/common";
import {AuthenticationService} from "../providers/authentication.service.interface";
import {USER_REPOSITORY} from "../authentication.metadata";
import {UserRepository} from "../repository/users.interface.repository";
import {CreateUserRequest, LoginUserRequest, UpdateUserRequest} from "@app/authentication/dto/authenticaion.dto";

export class AuthenticationMockService implements AuthenticationService {
  constructor(
    @Inject(USER_REPOSITORY)
    private userRepository: UserRepository
  ) {}
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
