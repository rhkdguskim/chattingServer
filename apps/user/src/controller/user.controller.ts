import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Inject,
  Param,
  Post,
  Put,
  UseGuards,
} from "@nestjs/common";
import {
  ApiCreatedResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
} from "@nestjs/swagger";
import { SelfGuard } from "@app/authorization/guards/authorization.self.guard";
import { JwtGuard } from "@app/authorization/guards/authorization.jwt.guard";
import { UsersController } from "@app/user/controller/user.controller.interface";
import { USER_SERVICE } from "@app/user/user.metadata";
import { UserService } from "@app/user/providers/user.service.interface";
import {
  CreateUserRequest,
  UpdateUserRequest,
  UserInfoResponse,
} from "@app/user/dto/user.dto";

@Controller("users")
@ApiTags("Users")
export class UsersControllerImpl implements UsersController {
  constructor(
    @Inject(USER_SERVICE)
    private readonly userService: UserService
  ) {}

  @Get("")
  @ApiOperation({
    summary: "전체 사용자 검색",
    description: "전체 사용자를 검색합니다.",
  })
  findAllUsers(): Promise<UserInfoResponse[]> {
    return this.userService.findAllUsers();
  }

  @Post("")
  @ApiOperation({
    summary: "사용자 생성",
    description: "사용자를 생성한다.",
  })
  @ApiCreatedResponse({
    description: "생성된 사용자 정보를 return 합니다.",
    type: UserInfoResponse,
  })
  async signUp(@Body() user: CreateUserRequest): Promise<UserInfoResponse> {
    return await this.userService.register(user);
  }

  @UseGuards(JwtGuard, SelfGuard)
  @Delete(":id")
  @ApiParam({ name: "id", type: Number, description: "사용자 ID" })
  @ApiOperation({
    summary: "사용자 삭제",
    description: "사용자를 제거한다.",
  })
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteUser(@Param("id") payload: number): Promise<void> {
    await this.userService.deleteUser(payload);
  }

  @UseGuards(JwtGuard)
  @Get(":id")
  @ApiParam({
    name: "id",
    description: "사용자 ID, user_id, id 필드 둘다 가능",
  })
  @ApiOperation({
    summary: "사용자 ID 검색",
    description: "전체 사용자를 검색합니다.",
  })
  async findUser(@Param("id") id: string | number): Promise<UserInfoResponse> {
    if (!isNaN(+id)) {
      id = Number(id);
    }
    return await this.userService.findUserByID(id);
  }

  @UseGuards(JwtGuard, SelfGuard)
  @Put(":id")
  @ApiOperation({
    summary: "사용자 수정",
    description: "사용자 정보를 수정합니다.",
  })
  @HttpCode(HttpStatus.NO_CONTENT)
  async updateUser(
    @Param("id") id: number,
    @Body() payload: UpdateUserRequest
  ): Promise<void> {
    await this.userService.updateUser(id, payload);
  }
}
