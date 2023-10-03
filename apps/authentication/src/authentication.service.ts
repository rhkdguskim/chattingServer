import {ForbiddenException, HttpStatus, Inject, Injectable, Logger, UnauthorizedException} from '@nestjs/common';
import {LoginUserRequest, LoginUserResponse, NewTokenRequest, OAuthRequest, UpdateUserRequest} from "@app/common/dto";
import * as bcrypt from "bcrypt";
import {JwtService} from "@nestjs/jwt";
import {CreateUserRequest} from "@src/users/dto/users.dto";
import { User} from "@app/common/entity";
import {UsersService} from "./users.service";
import {ClientProxy, RpcException} from "@nestjs/microservices";
import {AUTHORIZATION_SERVICE, JWT_SIGN} from "@app/common/constant";
import {lastValueFrom} from "rxjs";

@Injectable()
export class AuthenticationService {
  constructor(
      @Inject(AUTHORIZATION_SERVICE)
      private authorizationClient : ClientProxy,
      private userService: UsersService,
  ) {}

  async signIn(loginUser: LoginUserRequest): Promise<LoginUserResponse> {
    const user = await this.userService.findbyUserId(loginUser.user_id);

    if (!user) {
      throw new RpcException("아이디가 존재하지 않습니다.");
    }

    const isPasswordValid = await bcrypt.compare(
        loginUser.password,
        user.password
    );

    if (!isPasswordValid) {
      throw new RpcException("잘못된 패스워드 입니다.");
    }

    const payload = { id: user.id, user_id: user.user_id };
    return await lastValueFrom(this.authorizationClient.send({cmd:JWT_SIGN}, payload))
  }

  async create(createUserDto: CreateUserRequest): Promise<User> {
    const isExist = await this.userService.findbyUserId(createUserDto.user_id);
    if (isExist) {
      throw new RpcException("이미 등록된 사용자입니다.");
    }

    return this.userService.createUser(createUserDto);
  }

  async findOne(id : number): Promise<User> {
    return await this.userService.findOne(id)
  }

  async update(payload : UpdateUserRequest) : Promise<User> {
    return await this.userService.saveUser(payload);
  }

  async getNewAccessToken(
      payload : NewTokenRequest,
  ): Promise<LoginUserResponse> {
    const user = await this.userService.findOne(payload.user_id);
    return lastValueFrom(this.authorizationClient.send({cmd:JWT_SIGN}, user));
  }
  async OAuthLogin(OAuthData: OAuthRequest): Promise<LoginUserResponse> {
    let user = await this.userService.findbyUserId(OAuthData.user.user_id);

    if (user) {
      // 이미 등록된 사용자
      Logger.log("이미 등록된 사용자 입니다.");
    } else {
      // 가입이 되어있지 않다면 Auto Login
      user = await this.userService.createOAuthUser(OAuthData);
    }
    const payload = { id: user.id, user_id: user.user_id };
    return await lastValueFrom(this.authorizationClient.send({cmd:JWT_SIGN}, payload))
  }
}
