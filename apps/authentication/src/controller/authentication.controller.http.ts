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
  @ApiOperation({
    summary: "Login Given Token",
    description: "Given Token",
  })
  @ApiCreatedResponse({
    description : "Access Token, Refresh Token",
    type : LoginUserResponse
  })
  async signIn(
    @Body()loginUser: LoginUserRequest
  ): Promise<LoginUserResponse> {
    return await this.authenticationService.signIn(loginUser);
  }

  @Post("google")
  @UseGuards(AuthGuard("google"))
  @ApiOperation({
    summary: "OAuth Google Login",
    description: "Oauth 2.0",
  })
  @ApiCreatedResponse({
    description : "Access Token, Refresh Token",
    type : LoginUserResponse
  })
  oAuthGoogle(@GetOAuthData()data: OAuthData): Promise<LoginUserResponse> {
    return Promise.resolve(undefined);
  }

  @Post("kakao")
  @UseGuards(AuthGuard("kakao"))
  @ApiOperation({
    summary: "OAuth Kakao Login",
    description: "Oauth 2.0",
  })
  @ApiCreatedResponse({
    description : "Access Token, Refresh Token",
    type : LoginUserResponse
  })
  oAuthKakao(@GetOAuthData()data: OAuthData): Promise<LoginUserResponse> {
    return Promise.resolve(undefined);
  }

  @Post("naver")
  @UseGuards(AuthGuard("naver"))
  @ApiOperation({
    summary: "OAuth Naver Login",
    description: "Oauth 2.0",
  })
  @ApiCreatedResponse({
    description : "Access Token, Refresh Token",
    type : LoginUserResponse
  })
  oAuthNaver(@GetOAuthData()data: OAuthData): Promise<LoginUserResponse> {
    return Promise.resolve(undefined);
  }

  @Post("refreshtoken")
  @ApiOperation({
    summary: "Refresh Token",
    description: "Refresh Token을 사용한 access token, refresh token 재발급",
  })
  @ApiCreatedResponse({
    description : "Access Token, Refresh Token",
    type : LoginUserResponse
  })
  refreshToken(@Body() token: TokenRequest): Promise<LoginUserResponse> {
    return Promise.resolve(undefined);
  }
}
