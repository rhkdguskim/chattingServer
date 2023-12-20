import { Inject, Injectable } from "@nestjs/common";
import {
  ChatServerException,
  ChatServerExceptionCode,
} from "@app/common/exception/chatServerException";
import { NullCheck } from "@app/common/util/util";
import { AuthenticationService } from "./authentication.service.interface";
import {
  AUTHENTICATION_BCRYPT,
  USER_REPOSITORY,
} from "../authentication.metadata";
import { UserRepository } from "../repository/users.interface.repository";
import {
  CreateUserRequest,
  LoginUserRequest,
  LoginUserResponse,
  UpdateUserRequest,
  UserInfoResponse,
} from "@app/authentication/dto/authenticaion.dto";
import { BcryptService } from "@app/authentication/providers/bcrypt/bcrpy.interface";
import { JWT_SERVICE } from "@app/authorization/authorization.metadata";
import { CommonJwtService } from "@app/common/auth/common.jwtService";
import { TokenInfoRequest } from "@app/authorization/dto/authorization.dto";
import { UserEntity } from "@app/authentication/entity/users.entity";

@Injectable()
export class AuthenticationServiceImpl implements AuthenticationService {
  constructor(
    @Inject(JWT_SERVICE)
    private readonly jwtService: CommonJwtService,
    @Inject(AUTHENTICATION_BCRYPT)
    private bcryptService: BcryptService,
    @Inject(USER_REPOSITORY)
    private userRepository: UserRepository
  ) {}

  async signIn(loginUser: LoginUserRequest): Promise<LoginUserResponse> {
    const user = await this.userRepository.findOneByUserID(loginUser.user_id);

    if (NullCheck(user)) {
      throw new ChatServerException({
        message: "There is no User",
        code: ChatServerExceptionCode.Authentication,
      });
    }

    if (!this.bcryptService.compare(loginUser.password, user.password)) {
      throw new ChatServerException({
        message: "Invalid Password",
        code: ChatServerExceptionCode.Authentication,
      });
    }

    return await this.jwtService.sign(new TokenInfoRequest(user));
  }

  async register(createUserDto: CreateUserRequest): Promise<UserInfoResponse> {
    const user = await this.userRepository.findOneByUserID(
      createUserDto.user_id
    );

    if (!NullCheck(user)) {
      throw new ChatServerException({
        message: "Already Exist",
        code: ChatServerExceptionCode.Already_Exist,
      });
    }
    createUserDto.password = this.bcryptService.hash(createUserDto.password);
    return new UserInfoResponse(
      await this.userRepository.create(createUserDto)
    );
  }

  async findUserByID(id: number): Promise<UserInfoResponse> {
    let user: UserEntity;
    if (typeof id === "number") {
      user = await this.userRepository.findOne(id);
    } else {
      user = await this.userRepository.findOneByUserID(id);
    }

    if (NullCheck(user)) {
      throw new ChatServerException({
        message: "Can't Find User Information",
        code: ChatServerExceptionCode.NotFound,
      });
    }
    return new UserInfoResponse(user);
  }

  async updateUser(id: number, payload: UpdateUserRequest): Promise<boolean> {
    try {
      return await this.userRepository.update(id, payload);
    } catch (e) {
      throw new ChatServerException({
        message: e,
        code: ChatServerExceptionCode.Authentication,
      });
    }
  }

  async deleteUser(payload: number): Promise<boolean> {
    const result = await this.userRepository.delete(payload);
    if (!result) {
      throw new ChatServerException({
        message: "Can't not found User",
        code: ChatServerExceptionCode.NotFound,
      });
    }
    return result;
  }

  async findAllUsers(): Promise<UserInfoResponse[]> {
    const users = await this.userRepository.findAll();
    return users.map((user) => {
      return new UserInfoResponse(user);
    });
  }
}
