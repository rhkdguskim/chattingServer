import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UseGuards,
} from "@nestjs/common";

import {
  ApiCreatedResponse,
  ApiOperation,
  ApiSecurity,
  ApiTags,
} from "@nestjs/swagger";
import { JwtGuard } from "@lib/common/guard/authorization.jwt.guard";

import { FriendService } from "../providers/friend.service.interface";
import { FriendController } from "./friend.controller.interface";
import {
  CreateFriendRequest,
  CreateFriendResponse,
  DeleteFriendRequest,
  UpdateFriendRequest,
} from "../dto/friend.dto";
import {
  Role,
  Roles,
  RolesGuard,
} from "@lib/common/guard/authorization.role.guard";
import { SelfGuard } from "@lib/common/guard/authorization.self.guard";
import { FRIEND_SERVICE } from "@app/user/user.metadata";
import { UserInfoResponse } from "@app/user/dto/user.dto";

@Controller("friend")
@UseGuards(JwtGuard, RolesGuard, SelfGuard)
@ApiSecurity("authentication")
@ApiTags("friend")
export class FriendControllerImpl implements FriendController {
  constructor(
    @Inject(FRIEND_SERVICE)
    private friendService: FriendService
  ) {}

  @Get(":id")
  @Roles(Role.USER)
  @ApiOperation({
    summary: "친구 목록 가져오기",
    description: "친구 목록을 가져온다.",
  })
  @ApiCreatedResponse({
    description: "사용자가 등록한 등록된 친구 목록을 가져옵니다.",
  })
  async FindAllFriends(
    @Param("id", ParseIntPipe) id: number
  ): Promise<UserInfoResponse[]> {
    return this.friendService.getFriends(id);
  }

  @Post(":id")
  @ApiOperation({
    summary: "친구 추가하기",
    description: "친구를 추가합니다.",
  })
  @ApiCreatedResponse({
    description: "친구를 추가합니다.",
    type: CreateFriendResponse,
  })
  @ApiCreatedResponse({ description: "새로운 친구를 추가합니다." })
  async AddFriend(
    @Param("id", ParseIntPipe) id: number,
    @Body() createFriend: CreateFriendRequest
  ): Promise<CreateFriendResponse> {
    return await this.friendService.addFriend(id, createFriend);
  }

  @Put(":id")
  @ApiOperation({
    summary: "친구 이름 변경하기",
    description: "등록된 친구중 친구정보를 변경합니다.",
  })
  @ApiCreatedResponse({ description: "등록된 친구중 친구정보를 변경합니다." })
  async updateFriend(
    @Param("id", ParseIntPipe) id: number,
    @Body() createFriend: UpdateFriendRequest
  ): Promise<boolean> {
    return this.friendService.changeFriendName(id, createFriend);
  }

  @Delete(":id")
  @ApiOperation({
    summary: "친구 삭제",
    description: "등록된 친구중 친구를 삭제합니다.",
  })
  @ApiCreatedResponse({ description: "등록된 친구중 친구를 삭제합니다." })
  async deleteFriend(
    @Param("id", ParseIntPipe) id: number,
    @Body() delFriend: DeleteFriendRequest
  ): Promise<boolean> {
    return this.friendService.delFriend(id, delFriend);
  }
}
