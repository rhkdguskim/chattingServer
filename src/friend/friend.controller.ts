import {
  Controller,
  Get,
  Post,
  Put,
  UseGuards,
  Body,
  Delete,
  UseInterceptors,
} from "@nestjs/common";
import { FriendService } from "./friend.service";
import { Friend } from "@src/entitys/friend.entity";
import { User } from "@src/entitys/users.entity";
import { GetUser } from "@src/auth/deco/auth.decorator";
import { ApiTags, ApiOperation, ApiCreatedResponse } from "@nestjs/swagger";
import { CreateFriendDto } from "@src/friend/dto/friend.createfriend.dto";
import { HttpCacheInterceptor } from "@src/common/interceptors/httpcache.interceptor";
import { AuthGuard } from "@nestjs/passport";

@Controller("friend")
@UseGuards(AuthGuard('jwt'))
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
  async FindAll(@GetUser() user: User): Promise<User[]> {
    return this.friendService.getFriends(user);
  }

  @Post("")
  @ApiOperation({
    summary: "친구 추가하기 API",
    description: "친구를 추가합니다.",
  })
  @ApiCreatedResponse({ description: "새로운 친구를 추가합니다." })
  async AddFriend(
    @Body() createFriend: CreateFriendDto,
    @GetUser() user: User
  ): Promise<Friend> {
    return this.friendService.addFriend(createFriend, user);
  }

  @Put("")
  @ApiOperation({
    summary: "친구 이름 변경하기 API",
    description: "등록된 친구중 친구정보를 변경합니다.",
  })
  @ApiCreatedResponse({ description: "등록된 친구중 친구정보를 변경합니다." })
  async ModFriend(
    @Body() createFriend: CreateFriendDto,
    @GetUser() user: User
  ): Promise<Friend> {
    return this.friendService.changeFriendName(createFriend, user);
  }

  @Delete("")
  @ApiOperation({
    summary: "친구 삭제 API",
    description: "등록된 친구중 친구를 삭제합니다.",
  })
  @ApiCreatedResponse({ description: "등록된 친구중 친구를 삭제합니다." })
  async DelFriend(
    @Body() delFriend: Friend,
    @GetUser() user: User
  ): Promise<any> {
    return this.friendService.delFriend(delFriend, user);
  }
}
