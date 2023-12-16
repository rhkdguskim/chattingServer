import {
  Body,
  Controller,
  Post, Delete, Get, Put,
  UseInterceptors, Inject, Param,
} from "@nestjs/common";
import { ApiTags, ApiOperation, ApiCreatedResponse } from "@nestjs/swagger";
import { HttpCacheInterceptor } from "@src/common/interceptors/httpcache.interceptor";
import { CacheEvict } from "@src/common/decorator/cache-decorator";
import {User} from "../entity/users.entity";
import {AuthenticationController} from "./authentication.controller.interface";
import {AuthenticationService} from "../providers/authentication.service.interface";
import {AuthenticationLocalService} from "../providers/authentication.local.service";
import {
  CreateUserRequest,
  LoginUserRequest,
  LoginUserResponse, UpdateUserRequest,
  UserResponse
} from "@app/authentication/dto/authenticaion.dto";
import {AUTHENTICATION_SERVICE} from "@app/authentication/authentication.metadata";

@Controller("auth")
@ApiTags("권한")
export class AuthenticationControllerHttp implements AuthenticationController {
  constructor(@Inject(AUTHENTICATION_SERVICE)private authenticationService: AuthenticationService) {}

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
    return await this.authenticationService.signIn(loginUser);
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
  async signUp(@Body() user: CreateUserRequest): Promise<UserResponse> {
    return await this.authenticationService.signUp(user);
  }

  @Delete("")
  @ApiOperation({
    summary: "사용자 삭제",
    description: "사용자를 제거한다.",
  })
  deleteUser(payload: number): Promise<any> {
    return this.authenticationService.delete(payload);
  }

  @Get("")
  @ApiOperation({
    summary: "전체 사용자 검색",
    description: "전체 사용자를 검색합니다.",
  })
  findAllUsers(): Promise<User[]> {
    return this.authenticationService.findAll();
  }

  @Get(":id")
  @ApiOperation({
    summary: "사용자 ID로 사용자를 검색합니다.",
    description: "전체 사용자를 검색합니다.",
  })
  async findUser(@Param('id') id: string | number): Promise<User> {
    if (!isNaN(+id)) {
      return await this.authenticationService.findOne(+id);
    } else {
      return await this.authenticationService.findOneByID(String(id));
    }
  }

  @Put()
  @ApiOperation({
    summary: "사용자 ID로 사용자를 검색합니다.",
    description: "전체 사용자를 검색합니다.",
  })
  updateUser(@Body() payload: UpdateUserRequest): Promise<User | boolean> {
    return this.authenticationService.update(payload);
  }

  // @Post("refreshtoken")
  // @ApiOperation({
  //   summary: "사용자 Token 재발급 API",
  //   description: "Refresh Token을 사용한 access token, refresh token 재발급",
  // })
  // @ApiCreatedResponse({
  //   description: "JWT 토큰을 재발급합니다",
  //   type: LoginUserResponse,
  // })
  // async getNewToken(
  //   @Body() refreshtokenRequest: any
  // ): Promise<LoginUserResponse> {
  //   return await this.authenticationService.getNewAccessToken({
  //     refresh_token: refreshtokenRequest.refresh_token,
  //     user_id: refreshtokenRequest.id,
  //   });
  // }

  // @Post("kakao/login")
  // @UseGuards(AuthGuard("kakao"))
  // @ApiOperation({
  //   summary: "OAuth 2.0 카카오톡 로그인 API",
  //   description: "카카오톡으로 인증하여 로그인을 구현합니다.",
  // })
  // @ApiCreatedResponse({
  //   description: "JWT 토큰을 재발급합니다",
  //   type: LoginUserResponse,
  // })
  // async Kakao(@GetOAuthData() data: OAuthData) {

  //   return await this.authService.signIn(data);
  // }

  // @Post("naver/login")
  // @UseGuards(AuthGuard("naver"))
  // @ApiOperation({
  //   summary: "OAuth 2.0 네이버 로그인 API",
  //   description: "네이버으로 인증하여 로그인을 구현합니다.",
  // })
  // @ApiCreatedResponse({
  //   description: "JWT 토큰을 재발급합니다",
  //   type: LoginUserResponse,
  // })
  // async Naver(@GetOAuthData() data: OAuthData) {
  //   return await this.authService.OAuthLogin(data);
  // }

  // @Post("google/login")
  // @UseGuards(AuthGuard("google"))
  // @ApiOperation({
  //   summary: "OAuth 2.0 구글 로그인 API",
  //   description: "구글으로 인증하여 로그인을 구현입니다.",
  // })
  // @ApiCreatedResponse({
  //   description: "JWT 토큰을 재발급합니다",
  //   type: LoginUserResponse,
  // })
  // async Google(@GetOAuthData() data: OAuthData) {
  //   return await this.authService.OAuthLogin(data);
  // }
}
