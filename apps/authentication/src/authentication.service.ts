import { Inject, Injectable, Logger } from "@nestjs/common";
import {
  LoginUserRequest,
  OAuthRequest,
  UpdateUserRequest,
} from "@app/common/dto";
import { CreateUserRequest } from "@app/common/dto";
import { UserTypeORM } from "@app/common/entity/typeorm";
import { UserRepository } from "./users.repository";
import { AuthenticationDomain } from "./authentication.domain";
import { CustomRpcExceptionException, RpcExceptionType } from "@app/common/exception/customrpcexception.exception";
import { NullCheck } from "@app/common/util/util";
@Injectable()
export class AuthenticationService {
  constructor(
    private authenticationDomain : AuthenticationDomain,
    private userRepository: UserRepository
  ) {}

  async signIn(loginUser: LoginUserRequest): Promise<UserTypeORM> {
    const user = await this.userRepository.findbyUserId(loginUser.user_id);

    if (NullCheck(user)) {
      throw new CustomRpcExceptionException({
        message : "아이디가 존재하지 않습니다.",
        code : RpcExceptionType.AUTHENTICATION_ERROR,
      });
    }

    if (!this.authenticationDomain.CheckPassword(loginUser.password, user.password)) {
      throw new CustomRpcExceptionException({
        message : "잘못된 패스워드 입니다.",
        code : RpcExceptionType.AUTHENTICATION_ERROR,
      });
    }

    return user;
  }

  async create(createUserDto: CreateUserRequest): Promise<UserTypeORM> {
    const user = await this.userRepository.findbyUserId(createUserDto.user_id);

    if (!NullCheck(user)) {
      throw new CustomRpcExceptionException({
        message : "이미 등록된 사용자입니다.",
        code : RpcExceptionType.AUTHENTICATION_ERROR,
      });
    }

    return this.userRepository.createUser(createUserDto);
  }

  async findOne(id: number): Promise<UserTypeORM> {
    return await this.userRepository.findOne(id);
  }

  async update(payload: UpdateUserRequest): Promise<UserTypeORM> {
    return await this.userRepository.saveUser(payload);
  }

  async delete(payload: number): Promise<any> {
    return await this.userRepository.remove(payload);
  }

  async findAll(): Promise<UserTypeORM[]> {
    return await this.userRepository.findAll();
  }

  async findbyUserId(user_id: string): Promise<UserTypeORM | null> {
    return await this.userRepository.findbyUserId(user_id);
  }
}
