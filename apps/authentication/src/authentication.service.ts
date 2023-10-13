import { Inject, Injectable, Logger } from "@nestjs/common";
import {
  LoginUserRequest,
  OAuthRequest,
  UpdateUserRequest,
} from "@app/common/dto";
import * as bcrypt from "bcrypt";
import { CreateUserRequest} from "@app/common/dto";
import { User } from "@app/common/entity";
import { UsersService } from "./users.service";
import { RpcException } from "@nestjs/microservices";

@Injectable()
export class AuthenticationService {
  constructor(
    @Inject(Logger) private logger: Logger,
    private userService: UsersService
  ) {}

  async signIn(loginUser: LoginUserRequest): Promise<User> {
    this.logger.debug(loginUser);
    const user = await this.userService.findbyUserId(loginUser.user_id);

    if (!user) {
      this.logger.error("아이디가 존재 하지 않습니다.");
      throw new RpcException("아이디가 존재하지 않습니다.");
    }

    const isPasswordValid = await bcrypt.compare(
      loginUser.password,
      user.password
    );

    if (!isPasswordValid) {
      this.logger.error("잘못된 패스워드 입니다.");
      throw new RpcException("잘못된 패스워드 입니다.");
    }

    return user;
  }

  async create(createUserDto: CreateUserRequest): Promise<User> {
    const isExist = await this.userService.findbyUserId(createUserDto.user_id);
    if (isExist) {
      this.logger.error("이미 등록된 사용자입니다.");
      throw new RpcException("이미 등록된 사용자입니다.");
    }

    return this.userService.createUser(createUserDto);
  }

  async findOne(id: number): Promise<User> {
    return await this.userService.findOne(id);
  }

  async update(payload: UpdateUserRequest): Promise<User> {
    return await this.userService.saveUser(payload);
  }

  async delete(payload: number): Promise<any> {
    return await this.userService.remove(payload);
  }

  async findAll(): Promise<User[]> {
    return await this.userService.findAll();
  }

  async findbyUserId(user_id: string): Promise<User | null> {
    return await this.userService.findbyUserId(user_id);
  }

  async OAuthLogin(OAuthData: OAuthRequest): Promise<User> {
    return this.userService.createUser(OAuthData.user);
  }
}
