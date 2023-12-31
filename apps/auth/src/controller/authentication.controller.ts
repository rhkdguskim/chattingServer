import { Body, Controller, Inject, Post, UseGuards } from "@nestjs/common";
import { ApiCreatedResponse, ApiOperation, ApiTags } from "@nestjs/swagger";
import { AuthenticationController } from "./authentication.controller.interface";
import { AuthenticationService } from "../providers/authentication.service.interface";
import {
  LoginUserRequest,
  LoginUserResponse,
} from "@app/auth/dto/authenticaion.dto";
import { AUTHENTICATION_SERVICE } from "@app/auth/authentication.metadata";
import { AuthGuard } from "@nestjs/passport";
import { GetOAuthData } from "@lib/common/decorator/auth.decorator";

@Controller("auth")
@ApiTags("Authentication")
export class AuthenticationControllerImpl implements AuthenticationController {
  constructor(
    @Inject(AUTHENTICATION_SERVICE)
    private authenticationService: AuthenticationService
  ) {}

  @Post("signin")
  @ApiOperation({
    summary: "Login Given Token",
    description: "Given Token",
  })
  @ApiCreatedResponse({
    description: "Access Token, Refresh Token",
    type: LoginUserResponse,
  })
  async signIn(
    @Body() loginUser: LoginUserRequest
  ): Promise<LoginUserResponse> {
    return await this.authenticationService.signIn(loginUser);
  }

  @Post("oauth/google")
  @UseGuards(AuthGuard("google"))
  @ApiOperation({
    summary: "OAuth Google Login",
    description: "Oauth 2.0",
  })
  @ApiCreatedResponse({
    description: "Access Token, Refresh Token",
    type: LoginUserResponse,
  })
  async googleSignIn(
    @GetOAuthData() data: LoginUserRequest
  ): Promise<LoginUserResponse> {
    return await this.authenticationService.signIn(data);
  }

  @Post("oauth/kakao")
  @UseGuards(AuthGuard("kakao"))
  @ApiOperation({
    summary: "OAuth Kakao Login",
    description: "Oauth 2.0",
  })
  @ApiCreatedResponse({
    description: "Access Token, Refresh Token",
    type: LoginUserResponse,
  })
  async kakaoSignIn(
    @GetOAuthData() data: LoginUserRequest
  ): Promise<LoginUserResponse> {
    return await this.authenticationService.signIn(data);
  }

  @Post("oauth/naver")
  @UseGuards(AuthGuard("naver"))
  @ApiOperation({
    summary: "OAuth Naver Login",
    description: "Oauth 2.0",
  })
  @ApiCreatedResponse({
    description: "Access Token, Refresh Token",
    type: LoginUserResponse,
  })
  async naverSignIn(
    @GetOAuthData() data: LoginUserRequest
  ): Promise<LoginUserResponse> {
    return await this.authenticationService.signIn(data);
  }
}
