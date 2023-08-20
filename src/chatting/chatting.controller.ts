import {
  Body,
  Controller,
  Post,
  Get,
  Param,
  Query,
  UseInterceptors,
} from "@nestjs/common";
import { UseGuards } from "@nestjs/common";
import { RoomService } from "./room.service";
import { ApiOperation, ApiCreatedResponse, ApiTags } from "@nestjs/swagger";
import { CreateRoom } from "./dto/chatting.createRoom.dto";
import { GetUser } from "src/auth/get-user.decorator";
import { User } from "src/users/users.entity";
import { Room } from "./room.entity";
import { InviteToRoom } from "./dto/chatting.inviteToRoom.dto";
import { Participant } from "./participant.entity";
import { Chatting } from "./chatting.entity";
import { RoomListResponse } from "./dto/room.roomListResponse.dto";
import { JwtAuthGuard } from "src/auth/jwt.auth.guard";
import { ChatCacheInterceptor } from "src/core/interceptors/chatcache.interceptor";
import { CacheAction } from "src/core/interceptors/cache-decorator";

@Controller("chatting")
@UseGuards(JwtAuthGuard)
@ApiTags("채팅리스트")
export class ChattingController {
  constructor(private chattingService: RoomService) {}

  @UseInterceptors(ChatCacheInterceptor)
  @CacheAction("READ")
  @Get(":id")
  @ApiOperation({
    summary: "방 ID로 채팅리스트들을 가져옵니다. API",
    description: "방 ID로 채팅리스트들을 가져옵니다.",
  })
  @ApiCreatedResponse({ description: "방 ID로 채팅리스트들을 가져옵니다." })
  async GetChattingList(
    @Param("id") id: number,
    @Query("cursor") cursor: number
  ): Promise<Chatting[]> {
    return await this.chattingService.getChattingList(id, cursor);
  }
}
