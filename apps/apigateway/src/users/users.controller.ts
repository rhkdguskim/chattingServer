import {
  Controller,
  Get,
  Put,
  Body,
  Param,
  UseInterceptors,
} from "@nestjs/common";
import { UsersService } from "./users.service";
import { UseGuards } from "@nestjs/common";

import {
  ApiTags,
  ApiOperation,
  ApiCreatedResponse,
  ApiParam,
  ApiOkResponse,
  ApiNotFoundResponse,
} from "@nestjs/swagger";
import { HttpCacheInterceptor } from "@src/common/interceptors/httpcache.interceptor";
import { AuthGuard } from "@nestjs/passport";
import {JwtGuard} from "@src/auth/guards/auth.jwt.guard";
import {UpdateUserRequest, UserResponse} from "@app/common/dto";

@UseGuards(JwtGuard)
@Controller("users")
@ApiTags("유저")
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get("")
  @ApiOperation({
    summary: "모든 유저 정보 API",
    description: "모든 사용자의 정보를 가져옵니다.",
  })
  @ApiCreatedResponse({ description: "모든 사용자의 정보를 가져옵니다." })
  async getAllUser(): Promise<UserResponse[]> {
    return await this.usersService.findAll();
  }

  @Put(":id")
  @ApiOperation({
    summary: "사용자 정보 업데이트 API",
    description: "사용자 정보를 업데이트 합니다.",
  })
  @ApiCreatedResponse({
    description: "사용자 정보를 업데이트 합니다.",
    type: UpdateUserRequest,
  })
  @ApiCreatedResponse({ description: "사용자 정보를 업데이트 합니다." })
  async updateUser(@Body() user: UpdateUserRequest): Promise<UserResponse> {
    return await this.usersService.updateUser(user);
  }

  @Get(":id")
  @ApiOperation({
    summary: "유저 찾기기능 API",
    description: "특정 사용자를 찾는 기능입니다.",
  })
  @ApiCreatedResponse({ description: "특정 사용자를 찾는 기능입니다." })
  async SearchUserByID(@Param("id") id: number): Promise<UserResponse> {
    return this.usersService.findOne(id);
  }

  @Get("user_id/:id")
  @ApiOperation({
    summary: "유저 찾기기능 API",
    description: "아이디를 사용하여 특정 사용자를 찾는 기능입니다.",
  })
  @ApiCreatedResponse({ description: "특정 사용자를 찾는 기능입니다." })
  async SearchUser(@Param("id") user_id: string): Promise<UserResponse> {
    return this.usersService.findbyUserId(user_id);
  }
}
