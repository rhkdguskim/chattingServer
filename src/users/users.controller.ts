import { Controller, Get, Put, Body, Param } from "@nestjs/common";
import { UsersService } from "./users.service";
import { User } from "./users.entity";
import { UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";

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

@UseGuards(AuthGuard())
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
    return this.usersService.findAll();
  }

  @Get("find:id")
  @ApiOperation({
    summary: "유저 찾기기능 API",
    description: "특정 사용자를 찾는 기능입니다.",
  })
  @ApiCreatedResponse({ description: "특정 사용자를 찾는 기능입니다." })
  async SearchUserByID(@Param("id") id: number): Promise<User> {
    return this.usersService.findOne(id);
  }

  @Get("search:id")
  @ApiOperation({
    summary: "유저 찾기기능 API",
    description: "특정 사용자를 찾는 기능입니다.",
  })
  @ApiCreatedResponse({ description: "특정 사용자를 찾는 기능입니다." })
  async SearchUser(@Param("id") user_id: string): Promise<User> {
    return this.usersService.findbyUserId(user_id);
  }

  @Put("update")
  @ApiOperation({
    summary: "사용자 정보 업데이트 API",
    description: "사용자 정보를 업데이트 합니다.",
  })
  @ApiCreatedResponse({ description: "사용자 정보를 업데이트 합니다." })
  async updateUser(@Body() user: UpdateUserDto): Promise<User> {
    return await this.usersService.saveUser(user);
  }

  @Get("profile")
  @ApiOperation({
    summary: "자기자신 정보 API",
    description: "자기자신의 정보를 불러옵니다.",
  })
  @ApiCreatedResponse({ description: "JWT Token으로 Profile값을 리턴합니다." })
  getProfile(@GetUser() user: User) {
    return user;
  }
}
