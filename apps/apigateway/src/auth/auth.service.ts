import {
  ForbiddenException,
  Injectable,
  UnauthorizedException,
  HttpStatus,
  Logger, Inject, OnModuleInit,
} from "@nestjs/common";
import { UsersService } from "@src/users/users.service";
import { JwtService } from "@nestjs/jwt";
import { User } from "@src/entitys/users.entity";
import { CreateUserRequest, LoginUserResponse } from "@src/users/dto/users.dto";
import * as bcrypt from "bcrypt";
import { LoginUserRequest } from "@src/users/dto/users.dto";
import { GetUser } from "@src/auth/deco/auth.decorator";
import { OAuthData } from "@src/auth/dto/oauth.dto";
import {AUTHENTICATION_SERVICE, SIGN_IN} from "@app/common";
import {ClientProxy} from "@nestjs/microservices";
import {lastValueFrom} from "rxjs";
import e from "express";

@Injectable()
export class AuthService{
  constructor (
      @Inject(AUTHENTICATION_SERVICE) private client : ClientProxy,
    private userService: UsersService,
    private jwtService: JwtService
  ) {

  }

  async signIn(loginUser: LoginUserRequest): Promise<any> {
    const pattern = {cmd : SIGN_IN}
    try {
      return await lastValueFrom(this.client.send<LoginUserResponse>(pattern, loginUser));
    } catch (e) {
      throw  new UnauthorizedException(e.message);
    }
  }

  async create(createUserDto: CreateUserRequest): Promise<any> {
    const isExist = await this.userService.findbyUserId(createUserDto.user_id);
    if (isExist) {
      throw new ForbiddenException({
        statusCode: HttpStatus.FORBIDDEN,
        message: [`이미 등록된 사용자입니다.`],
        error: "Forbidden",
      });
    }

    return this.userService.createUser(createUserDto);
  }

  private async setRefreshToken(refreshToken: string, userId: number) {
    const currentDateTime = new Date();
    const refreshTokenExpiry = new Date(
      currentDateTime.setMonth(currentDateTime.getMonth() + 1)
    ); // 1달 후 만료로 설정

    await this.userService.updateUser(userId, {
      refreshToken,
      refreshTokenExpiry,
    });
  }

  async generateRefreshToken(userId: number): Promise<string> {
    const refreshTokenPayload = { id: userId, isRefreshToken: true };
    const refreshToken = await this.jwtService.signAsync(refreshTokenPayload);

    this.setRefreshToken(refreshToken, userId);

    return refreshToken;
  }

  async getNewAccessToken(
    refreshToken: string,
    user_id: number
  ): Promise<LoginUserResponse> {
    const user = await this.userService.findOne(user_id);

    const isValidRefreshToken = await this.validateRefreshToken(
      refreshToken,
      user
    );

    if (!isValidRefreshToken) {
      throw new UnauthorizedException("Invailed refresh_token");
    }
    const refresh_token = await this.generateRefreshToken(user.id); // refresh_token을 다시 재발급.
    const access_token = await this.jwtService.signAsync({
      // access_token 발급.
      id: user.id,
      user_id: user.user_id,
    });

    return { access_token, refresh_token };
  }

  private async validateRefreshToken(
    refreshToken: string,
    user: User
  ): Promise<boolean> {
    if (user && user.refreshToken === refreshToken) {
      const currentDateTime = new Date();
      if (user.refreshTokenExpiry > currentDateTime) {
        return true;
      }
    }
    return false;
  }

  async OAuthLogin(OAuthData: OAuthData): Promise<any> {
    let user = await this.userService.findbyUserId(OAuthData.user.user_id);

    if (user) {
      // 이미 등록된 사용자
      Logger.log("이미 등록된 사용자 입니다.");
    } else {
      // 가입이 되어있지 않다면 Auto Login
      user = await this.userService.createOAuthUser(OAuthData);
    }
    const payload = { id: user.id, user_id: user.user_id };
    return {
      access_token: await this.jwtService.signAsync(payload),
      refresh_token: await this.generateRefreshToken(user.id),
    };
  }
}
