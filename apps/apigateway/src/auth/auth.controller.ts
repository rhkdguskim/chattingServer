import {
  Body,
  Controller,
  Get,
  Post,
  Res,
  UseGuards,
  UseInterceptors,
} from "@nestjs/common";
import { AuthService } from "@src/auth/auth.service";
import { ApiTags, ApiOperation, ApiCreatedResponse } from "@nestjs/swagger";
import { GetOAuthData, GetUser } from "@src/auth/deco/auth.decorator";
import { HttpCacheInterceptor } from "@src/common/interceptors/httpcache.interceptor";
import { CacheEvict } from "@src/common/decorator/cache-decorator";
import { AuthGuard } from "@nestjs/passport";
import { OAuthData } from "@app/common/dto/oauth.dto";
import * as config from "config";
import {User} from "@app/common/entity";
import {CreateUserRequest, LoginUserRequest, LoginUserResponse, UserResponse} from "@app/common/dto";
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
    @Body() loginUser: LoginUserRequest
  ): Promise<LoginUserResponse> {
    return await this.authService.signIn(loginUser);
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
    @Body() refreshtokenRequest: any
  ): Promise<LoginUserResponse> {
    return await this.authService.getNewAccessToken({
      refresh_token: refreshtokenRequest.refresh_token,
      user_id: refreshtokenRequest.id,
    });
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
  async Kakao(@GetOAuthData() data: OAuthData) {
    return await this.authService.OAuthLogin(data);
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
  async Naver(@GetOAuthData() data: OAuthData) {
    return await this.authService.OAuthLogin(data);
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
  async Google(@GetOAuthData() data: OAuthData) {
    return await this.authService.OAuthLogin(data);
  }
}
