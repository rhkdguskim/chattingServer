import { Inject, Injectable } from "@nestjs/common";
import { LoginUserRequest, UpdateUserRequest } from "@app/common/dto";
import { CreateUserRequest } from "@app/common/dto";
import { NodeBcryptService } from "./bcrypt/bcrpy.service";
import {
  CustomException,
  ExceptionType,
} from "@app/common/exception/custom.exception";
import { NullCheck } from "@app/common/util/util";
import { User } from "../entity/users.entity";
import {AuthenticationService} from "./authenticationservice.interface";
import {AUTHENTICATION_BCRYPT, USER_REPOSITORY} from "../authentication.metadata";
import {UserRepository} from "../repository/users.interface.repository";

@Injectable()
export class AuthenticationServiceLocal implements AuthenticationService {
  constructor(
    @Inject(AUTHENTICATION_BCRYPT)
    private authenticationDomain: NodeBcryptService,
    @Inject(USER_REPOSITORY)
    private userRepository: UserRepository
  ) {}

  async signIn(loginUser: LoginUserRequest): Promise<User> {
    const user = await this.userRepository.findOneByID(loginUser.user_id);

    if (NullCheck(user)) {
      throw new CustomException({
        message: "아이디가 존재하지 않습니다.",
        code: ExceptionType.AUTHENTICATION_ERROR,
      });
    }

    if (!this.authenticationDomain.compare(loginUser.password, user.password)) {
      throw new CustomException({
        message: "잘못된 패스워드 입니다.",
        code: ExceptionType.AUTHENTICATION_ERROR,
      });
    }

    return user;
  }

  async signUp(createUserDto: CreateUserRequest): Promise<User> {
    const user = await this.userRepository.findOneByID(createUserDto.user_id);
    if (!NullCheck(user)) {
      throw new CustomException({
        message: "이미 등록된 사용자입니다.",
        code: ExceptionType.AUTHENTICATION_ERROR,
      });
    }

    createUserDto.password = this.authenticationDomain.hash(createUserDto.password);

    return this.userRepository.create(createUserDto);
  }

  async findOne(id: number): Promise<User> {
      const user = await this.userRepository.findOne(id);

      if (NullCheck(user)) {
        throw new CustomException({
          message: "회원 정보를 찾을 수 없습니다.",
          code: ExceptionType.AUTHENTICATION_ERROR,
        });
      }

      return user;
  }

  async update(payload: UpdateUserRequest): Promise<User | boolean> {
    try {
      return await this.userRepository.update(payload.user_id, payload);
    } catch (e) {
      throw new CustomException({
        message: e,
        code: ExceptionType.AUTHENTICATION_ERROR,
      });
    }
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
