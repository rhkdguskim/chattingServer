import {
  Controller,
  Get,
  Post,
  Put,
  UseGuards,
  Body,
  Delete,
  Param,
  Inject,
} from "@nestjs/common";

import {
  ApiTags,
  ApiOperation,
  ApiCreatedResponse,
  ApiBasicAuth,
  ApiSecurity,
} from "@nestjs/swagger";
import { JwtGuard } from "@app/authorization/guards/authorization.jwt.guard";

import { FRIEND_SERVICE } from "../friend.message";
import { Friend } from "../entity/friend.entity";

import {FriendService} from "../providers/friend.service.interface";
import {FriendController} from "./friend.controller.interface";
import {CreateFriendRequest, CreateFriendResponse, DelteFriendRequest} from "../dto/friend.dto";

@Controller("friend")
@UseGuards(JwtGuard)
@ApiSecurity("authentication")
@ApiTags("친구")
export class FriendHttpController implements FriendController {
  constructor(
    @Inject(FRIEND_SERVICE)
    private friendService: FriendService) {}

  @Get(":id")
  @ApiOperation({
    summary: "친구 목록 가져오기 API",
    description: "친구 목록을 가져온다.",
  })
  @ApiCreatedResponse({
    description: "사용자가 등록한 등록된 친구 목록을 가져옵니다.",
  })
  async FindAllFriends(@Param("id") id: number): Promise<Friend[]> {
    return this.friendService.getMyFriends(id);
  }

  @Post(":id")
  @ApiOperation({
    summary: "친구 추가하기 API",
    description: "친구를 추가합니다.",
  })
  @ApiCreatedResponse({
    description: "친구를 추가합니다.",
    type: CreateFriendResponse,
  })
  @ApiCreatedResponse({ description: "새로운 친구를 추가합니다." })
  async AddFriend(
    @Body() createFriend: CreateFriendRequest
  ): Promise<CreateFriendResponse> {
    return this.friendService.addFriend(createFriend);
  }

  @Put(":id")
  @ApiOperation({
    summary: "친구 이름 변경하기 API",
    description: "등록된 친구중 친구정보를 변경합니다.",
  })
  @ApiCreatedResponse({
    description: "친구 정보를 변경합니다.",
    type: CreateFriendResponse,
  })
  @ApiCreatedResponse({ description: "등록된 친구중 친구정보를 변경합니다." })
  async updateFriend(
    @Body() createFriend: CreateFriendRequest
  ): Promise<Friend> {
    return this.friendService.changeFriendName(createFriend);
  }

  @Delete(":id")
  @ApiOperation({
    summary: "친구 삭제 API",
    description: "등록된 친구중 친구를 삭제합니다.",
  })
  @ApiCreatedResponse({ description: "등록된 친구중 친구를 삭제합니다." })
  async deleteFriend(@Body() delFriend: DelteFriendRequest): Promise<any> {
    return this.friendService.delFriend(delFriend);
  }
}
