import { Body, Controller, Post, Res } from "@nestjs/common";
import { User } from "../users/users.entity";
import { AuthService } from "./auth.service";
import { LoginUserDto } from "../users/dto/users.loginuser.dto";
import { CreateUserDto } from "../users/dto/users.createuser.dto";
import { ApiTags, ApiOperation, ApiCreatedResponse } from "@nestjs/swagger";
import { GetUser } from "./get-user.decorator";
import { Response } from "express";

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

  @Post("signup")
  @ApiOperation({
    summary: "사용자 생성 API",
    description: "사용자를 생성한다.",
  })
  @ApiCreatedResponse({ description: "사용자를 생성한다.", type: User })
  async createUser(@Body() user: CreateUserDto): Promise<User> {
    return await this.authService.create(user);
  }

  @Post("token")
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
}
