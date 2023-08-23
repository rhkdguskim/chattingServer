import { Body, Controller, Get, Logger, Post, Query, Res, UseInterceptors } from "@nestjs/common";
import { User } from "../users/users.entity";
import { AuthService } from "./auth.service";
import { LoginUserDto } from "../users/dto/users.loginuser.dto";
import { CreateUserDto } from "../users/dto/users.createuser.dto";
import { ApiTags, ApiOperation, ApiCreatedResponse } from "@nestjs/swagger";
import { GetUser } from "./get-user.decorator";
import { Response  } from "express";
import { HttpCacheInterceptor } from "src/core/interceptors/httpcache.interceptor";
import { CacheEvict } from "src/core/interceptors/cache-decorator";
import { KakaoAuthRequest, KakaoAuthResponse, KakaoLoginRequest, KakaoLogoutRequest, KakaoUserResponse } from "./dto/kakao.auth.dto";
import * as config from "config";

@Controller("auth")
@ApiTags("권한")
export class AuthController {
  constructor(private authService: AuthService,
    ) {}

  @Post("login")
  @ApiOperation({
    summary: "사용자 로그인 API",
    description: "사용자가 로그인을 한다.",
  })
  @ApiCreatedResponse({
    description: "JWT 토큰을 발급합니다",
    type: LoginUserDto,
  })
  async signIn(
    @Res({ passthrough: true }) response: Response,
    @Body() loginUser: LoginUserDto
  ) {
    const { access_token, refresh_token } = await this.authService.signIn(
      loginUser
    );
    response.cookie("jwt", access_token, {
      httpOnly: true,
    });
    return await { access_token, refresh_token };
  }

  @UseInterceptors(HttpCacheInterceptor)
  @CacheEvict("/users/")
  @Post("signup")
  @ApiOperation({
    summary: "사용자 생성 API",
    description: "사용자를 생성한다.",
  })
  @ApiCreatedResponse({ description: "사용자를 생성한다.", type: User })
  async createUser(@Body() user: CreateUserDto): Promise<User> {
    return await this.authService.create(user);
  }

  @Post("refreshtoken")
  @ApiOperation({
    summary: "사용자 Token 재발급 API",
    description: "Refresh Token을 사용한 access Token 재발급",
  })
  @ApiCreatedResponse({
    description: "Refresh Token을 사용한 access Token 재발급 합니다",
  })
  getNewToken(@Body() refresh_Token: string, @GetUser() user: User) {
    return this.authService.getNewAccessToken(refresh_Token, user);
  }

  @Get("kakao/login")
  @ApiOperation({
    summary: "OAuth 2.0 카카오톡 로그인 API",
    description: "카카오톡으로 인증하여 로그인을 구현합니다.",
  })

  KakaoTalk(@Res() res: Response) {
    const kakao = config.get("kakao");
    const request : KakaoLoginRequest = {
      client_id : kakao.restApiKey,
      redirect_uri : kakao.redirectURL,
      response_type : kakao.response_type,
    }
    const url = kakao.loginURL;


    res.redirect(this.authService.kakaoLogin(url, request));
  }

  @Get("kakao/logout")
  @ApiOperation({
    summary: "OAuth 2.0 카카오톡 로그아웃 API",
    description: "발급받은 토큰 기반으로 로그아웃 기능을 구현합니다",
  })
  kakaoLogout() {
    const kakao = config.get("kakao");
    const body : KakaoLogoutRequest = {
      client_id : kakao.restApiKey,
      logout_redirect_uri : kakao.redirect_uri,
    }

    const url = kakao.logoutURL;
    const access_token = 'dummy'

    return this.authService.kakaoLogout(url, access_token, body)
  }

  @ApiOperation({
    summary: "OAuth 2.0 카카오톡 로그인 API",
    description: "KaKaoTalk Redirect URL 입니다.",
  })
  @Get("kakao/redirect")
  async kakaoTalkRedirect(@Query('code') code, @Res({ passthrough: true }) response: Response) {
    try {
      const kakao = config.get("kakao");
      const url = kakao.tokenURL;
      const userurl = kakao.userURL;
      const body : KakaoAuthRequest = {
        grant_type : kakao.grant_type,
        client_id : kakao.restApiKey,
        redirect_uri : kakao.redirectURL,
        code,
        client_secret : kakao.secret,
      }
      const authInfo : KakaoAuthResponse =  await this.authService.kakaoGetToken(url, body);
      const { access_token, refresh_token } = await this.authService.kakaoGetUserInfo(userurl, authInfo.access_token);

      response.cookie("jwt", access_token, {
        httpOnly: true,
      });

      return  { access_token, refresh_token };
    } catch (error) {
      Logger.error(error);
    }
  }
}
