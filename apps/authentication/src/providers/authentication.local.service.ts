import { Inject, Injectable } from "@nestjs/common";
import {
  ChatServerException,
  ChatServerExceptionCode,
} from "@app/common/exception/chatServerException";
import {NullCheck} from "@app/common/util/util";
import {AuthenticationService} from "./authentication.service.interface";
import {AUTHENTICATION_BCRYPT, USER_REPOSITORY} from "../authentication.metadata";
import {UserRepository} from "../repository/users.interface.repository";
import {
  CreateUserRequest,
  LoginUserResponse,
  LoginUserRequest,
  UpdateUserRequest, UserInfoResponse
} from "@app/authentication/dto/authenticaion.dto";
import {BcryptService} from "@app/authentication/providers/bcrypt/bcrpy.interface";
import {JWT_SERVICE} from "@app/authorization/authorization.metadata";
import {CommonJwtService} from "@app/common/auth/common.jwtService";
import {JWTRequest} from "@app/authorization/dto/authorization.dto";


@Injectable()
export class AuthenticationLocalService implements AuthenticationService {
  constructor(
      @Inject(JWT_SERVICE)
      private readonly  jwtService :CommonJwtService,
    @Inject(AUTHENTICATION_BCRYPT)
    private bcryptService: BcryptService,
    @Inject(USER_REPOSITORY)
    private userRepository: UserRepository
  ) {}

  async signIn(loginUser: LoginUserRequest): Promise<LoginUserResponse> {
    const user = await this.userRepository.findOneByID(loginUser.user_id);

    if (NullCheck(user)) {
      throw new ChatServerException({
        message: "There is no User",
        code: ChatServerExceptionCode.AUTHENTICATION,
      });
    }

    if (!this.bcryptService.compare(loginUser.password, user.password)) {
      throw new ChatServerException({
        message: "Invalid Password",
        code: ChatServerExceptionCode.AUTHENTICATION,
      });
    }

    return await this.jwtService.sign(new JWTRequest(user));
  }

  async signUp(createUserDto: CreateUserRequest): Promise<UserInfoResponse> {
    const user = await this.userRepository.findOneByID(createUserDto.user_id);

    if (!NullCheck(user)) {
      throw new ChatServerException({
        message: "Already Exist",
        code: ChatServerExceptionCode.ALREADY_EXIST,
      });
    }
    createUserDto.password = this.bcryptService.hash(createUserDto.password);
    return new UserInfoResponse(await this.userRepository.create(createUserDto));
  }

  async findOne(id: number): Promise<UserInfoResponse> {
      const user = await this.userRepository.findOne(id);

      if (NullCheck(user)) {
        throw new ChatServerException({
          message: "Can't Find User Information",
          code: ChatServerExceptionCode.NOT_FOUND,
        });
      }
      return new UserInfoResponse(user);
  }

  async update(id:number, payload: UpdateUserRequest): Promise<boolean> {
    try {
      return await this.userRepository.update(id, payload);
    } catch (e) {
      throw new ChatServerException({
        message: e,
        code: ChatServerExceptionCode.AUTHENTICATION,
      });
    }
  }

  async delete(payload: number): Promise<boolean> {
    const result = await this.userRepository.delete(payload)
    if(!result) {
      throw new ChatServerException({
        message: "Can't not found User",
        code: ChatServerExceptionCode.NOT_FOUND,
      });
    }
    return result
  }

  async findAll(): Promise<UserInfoResponse[]> {
    const users = await this.userRepository.findAll()
    return users.map((user) => {
      return new UserInfoResponse(user);
    });
  }

  async findOneByID(user_id: string): Promise<UserInfoResponse | null> {
    const user =  await this.userRepository.findOneByID(user_id)

    if (NullCheck(user)) {
      throw new ChatServerException({
        message: "Can't not found User",
        code: ChatServerExceptionCode.NOT_FOUND,
      });
    }

    return new UserInfoResponse(user);
  }
}
