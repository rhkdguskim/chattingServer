import { Body, Controller, Inject, Post, UseGuards } from "@nestjs/common";
import { ApiCreatedResponse, ApiOperation, ApiTags } from "@nestjs/swagger";
import { AuthenticationController } from "./authentication.controller.interface";
import { AuthenticationService } from "../providers/authentication.service.interface";
import {
  CreateUserRequestByOAuth,
  LoginUserRequest,
  LoginUserResponse,
} from "@app/authentication/dto/authenticaion.dto";
import { AUTHENTICATION_SERVICE } from "@app/authentication/authentication.metadata";
import { AuthGuard } from "@nestjs/passport";
import { GetOAuthData } from "@app/common/decoration/auth.decorator";

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
  googleSignIn(
    @GetOAuthData() data: CreateUserRequestByOAuth
  ): Promise<LoginUserResponse> {
    return Promise.resolve(undefined);
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
  kakaoSignIn(
    @GetOAuthData() data: CreateUserRequestByOAuth
  ): Promise<LoginUserResponse> {
    return Promise.resolve(undefined);
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
  naverSignIn(
    @GetOAuthData() data: CreateUserRequestByOAuth
  ): Promise<LoginUserResponse> {
    return Promise.resolve(undefined);
  }
}
