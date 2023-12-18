import {
  Body,
  Controller,
  Post, Inject, UseGuards,
} from "@nestjs/common";
import { ApiTags, ApiOperation, ApiCreatedResponse } from "@nestjs/swagger";
import {AuthenticationController} from "./authentication.controller.interface";
import {AuthenticationService} from "../providers/authentication.service.interface";
import {
    LoginUserRequest,
    LoginUserResponse,
} from "@app/authentication/dto/authenticaion.dto";
import {AUTHENTICATION_SERVICE} from "@app/authentication/authentication.metadata";
import {TokenRequest} from "@app/authorization/dto/authorization.dto";
import {AuthGuard} from "@nestjs/passport";
import {GetOAuthData} from "@app/common/decoration/auth.decorator";
import {OAuthData} from "@app/authorization/dto/oauth.dto";

@Controller("auth")
@ApiTags("Authentication")
export class AuthenticationControllerHttp implements AuthenticationController {
  constructor(@Inject(AUTHENTICATION_SERVICE)private authenticationService: AuthenticationService) {}

  @Post('signin')
  async signIn(
    @Body()loginUser: LoginUserRequest
  ): Promise<LoginUserResponse> {
    return await this.authenticationService.signIn(loginUser);
  }

  @Post("google")
  @UseGuards(AuthGuard("google"))
  @ApiOperation({
    summary: "OAuth 2.0 구글 로그인 API",
    description: "구글으로 인증하여 로그인을 구현입니다.",
  })
  oAuthGoogle(@GetOAuthData()data: OAuthData): Promise<LoginUserResponse> {
    return Promise.resolve(undefined);
  }

  @Post("kakao")
  @UseGuards(AuthGuard("kakao"))
  @ApiOperation({
    summary: "OAuth 2.0 카카오톡 로그인 API",
    description: "카카오톡으로 인증하여 로그인을 구현합니다.",
  })
  oAuthKakao(@GetOAuthData()data: OAuthData): Promise<LoginUserResponse> {
    return Promise.resolve(undefined);
  }

  @Post("naver")
  @UseGuards(AuthGuard("naver"))
  @ApiOperation({
    summary: "OAuth 2.0 네이버 로그인 API",
    description: "네이버으로 인증하여 로그인을 구현합니다.",
  })
  oAuthNaver(@GetOAuthData()data: OAuthData): Promise<LoginUserResponse> {
    return Promise.resolve(undefined);
  }

  @Post("refreshtoken")
  @ApiOperation({
    summary: "사용자 Token 재발급 API",
    description: "Refresh Token을 사용한 access token, refresh token 재발급",
  })
  refreshToken(@Body() token: TokenRequest): Promise<LoginUserResponse> {
    return Promise.resolve(undefined);
  }
}
