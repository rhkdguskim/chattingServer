import {
  ForbiddenException,
  Injectable,
  UnauthorizedException,
  HttpStatus,
  Logger, Inject,
} from "@nestjs/common";
import { UsersService } from "@src/users/users.service";
import { JwtService } from "@nestjs/jwt";
import { User } from "@src/entitys/users.entity";
import { CreateUserRequest, LoginUserResponse } from "@src/users/dto/users.dto";
import { LoginUserRequest } from "@src/users/dto/users.dto";
import { OAuthRequest, NewTokenRequest} from "@app/common/dto";
import { AUTHENTICATION_SERVICE, OAUTH_SIGN_IN, SIGN_UP, SIGN_IN, GET_NEW_TOKEN } from "@app/common/constant";
import {ClientProxy} from "@nestjs/microservices";
import {lastValueFrom} from "rxjs";

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
    const pattern = {cmd : SIGN_UP}
    try {
      return await lastValueFrom(this.client.send<User>(pattern, createUserDto));
    } catch (e) {
      throw new UnauthorizedException(e.message);
    }
  }

  async getNewAccessToken(
      newtokenRequest : NewTokenRequest
  ): Promise<LoginUserResponse> {
    const pattern = {cmd : GET_NEW_TOKEN}
    try {
      return await lastValueFrom(this.client.send<LoginUserResponse>(pattern, newtokenRequest));
    } catch (e) {
      throw new UnauthorizedException(e.message);
    }
  }

  async OAuthLogin(OAuthData: OAuthRequest): Promise<any> {
    const pattern = {cmd : OAUTH_SIGN_IN}
    try {
      return await lastValueFrom(this.client.send<LoginUserResponse>(pattern, OAuthData));
    } catch (e) {
      throw new UnauthorizedException(e.message);
    }
  }

  private async generateRefreshToken(userId: number): Promise<string> {
    const refreshTokenPayload = { id: userId, isRefreshToken: true };
    const refreshToken = await this.jwtService.signAsync(refreshTokenPayload);

    await this.setRefreshToken(refreshToken, userId);

    return refreshToken;
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
