import {
  Controller,
  Get,
  Post,
  Put,
  UseGuards,
  Body,
  Delete,
  UseInterceptors,
  Param,
} from "@nestjs/common";
import { FriendService } from "./friend.service";
import { FriendTypeORM } from "@app/common/typeorm/entity";
import {
  ApiTags,
  ApiOperation,
  ApiCreatedResponse,
  ApiBasicAuth,
  ApiSecurity,
} from "@nestjs/swagger";
import {
  CreateFriendRequest,
  CreateFriendResponse,
  DelteFriendRequest,
} from "@app/common/dto/friend.createfriend.dto";
import { JwtGuard } from "@src/auth/guards/auth.jwt.guard";
import { UserResponse } from "@app/common/dto";

@Controller("friend")
@UseGuards(JwtGuard)
@ApiSecurity("authentication")
@ApiTags("친구")
export class FriendController {
  constructor(private friendService: FriendService) {}

  @Get(":id")
  @ApiOperation({
    summary: "친구 목록 가져오기 API",
    description: "친구 목록을 가져온다.",
  })
  @ApiCreatedResponse({
    description: "사용자가 등록한 등록된 친구 목록을 가져옵니다.",
  })
  async FindAll(@Param("id") id: number): Promise<UserResponse[]> {
    return this.friendService.getFriends(id);
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
  async ModFriend(
    @Body() createFriend: CreateFriendRequest
  ): Promise<FriendTypeORM> {
    return this.friendService.changeFriendName(createFriend);
  }

  @Delete(":id")
  @ApiOperation({
    summary: "친구 삭제 API",
    description: "등록된 친구중 친구를 삭제합니다.",
  })
  @ApiCreatedResponse({ description: "등록된 친구중 친구를 삭제합니다." })
  async DelFriend(@Body() delFriend: DelteFriendRequest): Promise<any> {
    return this.friendService.delFriend(delFriend);
  }
}
