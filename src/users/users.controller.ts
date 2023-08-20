import {
  Controller,
  Get,
  Put,
  Body,
  Param,
  UseInterceptors,
} from "@nestjs/common";
import { UsersService } from "./users.service";
import { User } from "./users.entity";
import { UseGuards } from "@nestjs/common";

import { UpdateUserDto } from "src/users/dto/users.updateuser.dto";
import {
  ApiTags,
  ApiOperation,
  ApiCreatedResponse,
  ApiParam,
  ApiOkResponse,
  ApiNotFoundResponse,
} from "@nestjs/swagger";
import { GetUser } from "./../auth/get-user.decorator";
import { HttpCacheInterceptor } from "src/core/interceptors/httpcache.interceptor";
import { JwtAuthGuard } from "src/auth/jwt.auth.guard";

@UseGuards(JwtAuthGuard)
@UseInterceptors(HttpCacheInterceptor)
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
  async getAllUser(): Promise<User[]> {
    return await this.usersService.findAll();
  }

  @Put(":id")
  @ApiOperation({
    summary: "사용자 정보 업데이트 API",
    description: "사용자 정보를 업데이트 합니다.",
  })
  @ApiCreatedResponse({ description: "사용자 정보를 업데이트 합니다." })
  async updateUser(@Body() user: UpdateUserDto): Promise<User> {
    return await this.usersService.saveUser(user);
  }

  @Get(":id")
  @ApiOperation({
    summary: "유저 찾기기능 API",
    description: "특정 사용자를 찾는 기능입니다.",
  })
  @ApiCreatedResponse({ description: "특정 사용자를 찾는 기능입니다." })
  async SearchUserByID(@Param("id") id: number): Promise<User> {
    return this.usersService.findOne(id);
  }

  @Get("user_id/:id")
  @ApiOperation({
    summary: "유저 찾기기능 API",
    description: "특정 사용자를 찾는 기능입니다.",
  })
  @ApiCreatedResponse({ description: "특정 사용자를 찾는 기능입니다." })
  async SearchUser(@Param("id") user_id: string): Promise<User> {
    return this.usersService.findbyUserId(user_id);
  }
}
