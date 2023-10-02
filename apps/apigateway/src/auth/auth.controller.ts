import {
  Body,
  Controller, Get,
  Post,
  Res,
  UseGuards,
  UseInterceptors,
} from "@nestjs/common";
import { User } from "@src/entitys/users.entity";
import { AuthService } from "@src/auth/auth.service";
import {
  LoginUserRequest,
  LoginUserResponse,
  UserResponse,
  refreshtokenRequest,
} from "@src/users/dto/users.dto";
import { CreateUserRequest } from "@src/users/dto/users.dto";
import { ApiTags, ApiOperation, ApiCreatedResponse } from "@nestjs/swagger";
import { GetOAuthData, GetUser } from "@src/auth/deco/auth.decorator";
import { Request, Response } from "express";
import { HttpCacheInterceptor } from "@src/common/interceptors/httpcache.interceptor";
import { CacheEvict } from "@src/common/decorator/cache-decorator";
import { AuthGuard } from "@nestjs/passport";
import { OAuthData } from "@src/auth/dto/oauth.dto";

import * as config from "config";
const cors = config.get("cors");
const FRONT_END_HOST = cors.frontendHost;

@Controller("auth")
@ApiTags("권한")
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post("login")
  @ApiOperation({
    summary: "사용자 로그인 API",
    description: "사용자가 로그인을 한다.",
  })
  @ApiCreatedResponse({
    description: "JWT 토큰을 발급합니다",
    type: LoginUserResponse,
  })
  async signIn(
    @Res({ passthrough: true }) response: Response,
    @Body() loginUser: LoginUserRequest
  ) {
    const { access_token, refresh_token } = await this.authService.signIn(
      loginUser
    );
    response.cookie("jwt", access_token, {
      httpOnly: true,
    });

    const res: LoginUserResponse = {
      access_token,
      refresh_token,
    };
    return res;
  }

  @UseInterceptors(HttpCacheInterceptor)
  @CacheEvict("/users/")
  @Post("signup")
  @ApiOperation({
    summary: "사용자 생성 API",
    description: "사용자를 생성한다.",
  })
  @ApiCreatedResponse({
    description: "생성된 사용자 정보를 return 합니다.",
    type: UserResponse,
  })
  @ApiCreatedResponse({ description: "사용자를 생성한다.", type: User })
  async createUser(@Body() user: CreateUserRequest): Promise<UserResponse> {
    return await this.authService.create(user);
  }

  @Post("refreshtoken")
  @ApiOperation({
    summary: "사용자 Token 재발급 API",
    description: "Refresh Token을 사용한 access token, refresh token 재발급",
  })
  @ApiCreatedResponse({
    description: "JWT 토큰을 재발급합니다",
    type: LoginUserResponse,
  })
  async getNewToken(
    @Res({ passthrough: true }) response: Response,
    @Body() refreshtokenRequest: refreshtokenRequest
  ): Promise<LoginUserResponse> {
    const { access_token, refresh_token } =
      await this.authService.getNewAccessToken(
        refreshtokenRequest.refresh_token,
        refreshtokenRequest.id
      );

    response.cookie("jwt", access_token, {
      httpOnly: true,
    });

    const res: LoginUserResponse = {
      access_token,
      refresh_token,
    };
    return res;
  }

  @Post("kakao/login")
  @UseGuards(AuthGuard("kakao"))
  @ApiOperation({
    summary: "OAuth 2.0 카카오톡 로그인 API",
    description: "카카오톡으로 인증하여 로그인을 구현합니다.",
  })
  @ApiCreatedResponse({
    description: "JWT 토큰을 재발급합니다",
    type: LoginUserResponse,
  })
  async Kakao(
    @GetOAuthData() data: OAuthData,
    @Res({ passthrough: true }) response: Response
  ) {
    const { access_token, refresh_token } = await this.authService.OAuthLogin(
      data
    );

    response.cookie("jwt", access_token, {
      httpOnly: true,
    });

    const request: LoginUserResponse = {
      access_token,
      refresh_token,
    };
    return request;
  }

  @Post("naver/login")
  @UseGuards(AuthGuard("naver"))
  @ApiOperation({
    summary: "OAuth 2.0 네이버 로그인 API",
    description: "네이버으로 인증하여 로그인을 구현합니다.",
  })
  @ApiCreatedResponse({
    description: "JWT 토큰을 재발급합니다",
    type: LoginUserResponse,
  })
  async Naver(
    @GetOAuthData() data: OAuthData,
    @Res({ passthrough: true }) response: Response
  ) {
    const { access_token, refresh_token } = await this.authService.OAuthLogin(
      data
    );

    response.cookie("jwt", access_token, {
      httpOnly: true,
    });

    const request: LoginUserResponse = {
      access_token,
      refresh_token,
    };
    return request;
  }

  @Post("google/login")
  @UseGuards(AuthGuard("google"))
  @ApiOperation({
    summary: "OAuth 2.0 구글 로그인 API",
    description: "구글으로 인증하여 로그인을 구현입니다.",
  })
  @ApiCreatedResponse({
    description: "JWT 토큰을 재발급합니다",
    type: LoginUserResponse,
  })
  async Google(
    @GetOAuthData() data: OAuthData,
    @Res({ passthrough: true }) response: Response
  ) {
    const { access_token, refresh_token } = await this.authService.OAuthLogin(
      data
    );

    response.cookie("jwt", access_token, {
      httpOnly: true,
    });

    const request: LoginUserResponse = {
      access_token,
      refresh_token,
    };
    return request;
  }
}
