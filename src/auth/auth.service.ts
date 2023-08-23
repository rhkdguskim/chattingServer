import {
  ForbiddenException,
  Injectable,
  UnauthorizedException,
  HttpStatus,
  Res,
  Req,
  Response,
  Logger,
} from "@nestjs/common";
import { UsersService } from "../users/users.service";
import { JwtService } from "@nestjs/jwt";
import { User } from "../users/users.entity";
import { DeleteResult } from "typeorm";
import { CreateUserDto } from "../users/dto/users.createuser.dto";
import { UpdateUserDto } from "../users/dto/users.updateuser.dto";
import * as bcrypt from "bcrypt";
import { LoginUserDto } from "../users/dto/users.loginuser.dto";
import { GetUser } from "./get-user.decorator";
import { HttpService } from "@nestjs/axios";
import { Observable, catchError, from } from "rxjs";
import { KakaoAuthRequest, KakaoLoginRequest } from "./dto/kakao.auth.dto";
import { URLSearchParams } from "url";

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
    private http: HttpService,
  ) {}

  async signIn(loginUser: LoginUserDto): Promise<any> {
    const user = await this.userService.findbyUserId(loginUser.user_id);

    if (!user) {
      throw new UnauthorizedException();
    }

    const isPasswordValid = await bcrypt.compare(
      loginUser.password,
      user.password
    );

    if (!isPasswordValid) {
      throw new UnauthorizedException();
    }

    const payload = { id: user.id, user_id: user.user_id };

    return {
      access_token: await this.jwtService.signAsync(payload),
      refresh_token: await this.generateRefreshToken(user.id),
    };
  }

  async create(createUserDto: CreateUserDto): Promise<any> {
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

  private async generateRefreshToken(userId: number): Promise<string> {
    const refreshTokenPayload = { id: userId, isRefreshToken: true };
    const refreshToken = await this.jwtService.signAsync(refreshTokenPayload);

    this.setRefreshToken(refreshToken, userId);

    return refreshToken;
  }

  async getNewAccessToken(
    refreshToken: string,
    @GetUser() user: User
  ): Promise<string> {
    const isValidRefreshToken = await this.validateRefreshToken(
      refreshToken,
      user
    );

    if (!isValidRefreshToken) {
      throw new UnauthorizedException();
    }

    const payload = this.jwtService.verify(refreshToken);
    if (payload.isRefreshToken) {
      return this.jwtService.signAsync({
        id: payload.id,
        user_id: payload.user_id,
      });
    } else {
      throw new UnauthorizedException();
    }
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

  kakaoLogin(host:string, request : KakaoLoginRequest) : string {
    const queryParams = new URLSearchParams({
      client_id: request.client_id,
      redirect_uri: request.redirect_uri,
      response_type: 'code',
  }).toString();
    const url = `${host}?${queryParams}`;
    Logger.log(url)
    return url;
  }

  async kakaoGetToken(url : string, body: KakaoAuthRequest): Promise<any> {
    const {grant_type, client_id, redirect_uri, code, client_secret} = body;
    const headers = {
      'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
    };
    const query = new URLSearchParams({
      grant_type,
      client_id,
      redirect_uri,
      code,
      client_secret,
    }).toString();

    const response = await this.http.post(url, query, { headers }).toPromise();
    return response.data
  }

  async kakaogetUserInfo(url: string, access_token : string): Promise<any> {
    const headers = {
      Authorization: `Bearer ${access_token}`
    };
    
    const response = await this.http.get(url, {headers}).toPromise();
    return response;
  }

}
