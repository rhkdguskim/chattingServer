import { Inject, Injectable } from "@nestjs/common";
import {
  LoginUserRequest,
  UpdateUserRequest,
} from "@app/common/dto";
import { CreateUserRequest } from "@app/common/dto";
import { AuthenticationDomain } from "./authentication.domain";
import { CustomException, ExceptionType } from "@app/common/exception/custom.exception";
import { NullCheck } from "@app/common/util/util";
import { AuthenticationService, USER_REPOSITORY, UserRepository } from "apps/authentication/src/authentication.interface";
import { User } from "@app/common/entity/users.entity";
@Injectable()
export class AuthenticationServiceImpl implements AuthenticationService {
  constructor(
    private authenticationDomain : AuthenticationDomain,
    @Inject(USER_REPOSITORY)
    private userRepository: UserRepository
  ) {}

  async signIn(loginUser: LoginUserRequest): Promise<User> {
    const user = await this.userRepository.findOneByID(loginUser.user_id);

    if (NullCheck(user)) {
      throw new CustomException({
        message : "아이디가 존재하지 않습니다.",
        code : ExceptionType.AUTHENTICATION_ERROR,
      });
    }

    if (!this.authenticationDomain.compare(loginUser.password, user.password)) {
      throw new CustomException({
        message : "잘못된 패스워드 입니다.",
        code : ExceptionType.AUTHENTICATION_ERROR,
      });
    }

    return user;
  }

  async signUp(createUserDto: CreateUserRequest): Promise<User> {
    const user = await this.userRepository.findOneByID(createUserDto.user_id);

    if (!NullCheck(user)) {
      throw new CustomException({
        message : "이미 등록된 사용자입니다.",
        code : ExceptionType.AUTHENTICATION_ERROR,
      });
    }

    return this.userRepository.create(createUserDto);
  }

  async findOne(id: number): Promise<User> {
    return await this.userRepository.findOne(id);
  }

  async update(payload: UpdateUserRequest): Promise<User | boolean> {
    return await this.userRepository.update(payload.user_id, payload);
  }

  async delete(payload: number): Promise<boolean> {
    return await this.userRepository.delete(payload);
  }

  async findAll(): Promise<User[]> {
    return await this.userRepository.findAll();
  }

  async findOneByID(user_id: string): Promise<User | null> {
    return await this.userRepository.findOneByID(user_id);
  }
}
