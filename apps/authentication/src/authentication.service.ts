import {ForbiddenException, HttpStatus, Injectable, Logger, UnauthorizedException} from '@nestjs/common';
import { LoginUserRequest, LoginUserResponse} from "@app/common";
import * as bcrypt from "bcrypt";
import {JwtService} from "@nestjs/jwt";
import {CreateUserRequest} from "@src/users/dto/users.dto";
import { User} from "@app/common";
import {UsersService} from "./users.service";

@Injectable()
export class AuthenticationService {

  constructor(
      private userService: UsersService,
      private jwtService: JwtService
  ) {}

  async signIn(loginUser: LoginUserRequest): Promise<LoginUserResponse> {
    const user = await this.userService.findbyUserId(loginUser.user_id);

    if (!user) {
      throw new UnauthorizedException("아이디가 존재하지 않습니다.");
    }

    const isPasswordValid = await bcrypt.compare(
        loginUser.password,
        user.password
    );

    if (!isPasswordValid) {
      throw new UnauthorizedException("잘못된 패스워드 입니다.");
    }

    const payload = { id: user.id, user_id: user.user_id };

    const access_token = await this.jwtService.signAsync(payload);
    const refresh_token = await this.generateRefreshToken(user.id);
    await this.setRefreshToken(refresh_token, user.id);

    return {
      access_token,
      refresh_token,
    };
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
}
