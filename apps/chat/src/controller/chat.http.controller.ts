import {Body, Controller, Get, Inject, Param, Post, Query, UseInterceptors} from "@nestjs/common";
import { UseGuards } from "@nestjs/common";
import {ApiOperation, ApiCreatedResponse, ApiTags, ApiSecurity} from "@nestjs/swagger";
import { ReadChatCacheInterceptor } from "../interceptors/chatting.readchat.cache.interceptor";
import { JwtGuard } from "@app/authorization/guards/authorization.jwt.guard";
import {ChattingResponse, RequestMessage} from "../dto/chat.dto";
import {ChatService} from "../providers/chat.service.interface";
import {CHAT_SERVICE} from "../chat.metadata";
import {UserEntity} from "@app/authentication/entity/users.entity";
import {RoomEntity} from "@app/chat/entity/room.entity";
import {SelfGuard} from "@app/authorization/guards/authorization.self.guard";

@Controller("chatting")
@UseGuards(JwtGuard, SelfGuard)
@ApiSecurity("authentication")
@ApiTags("chatting")
export class ChatHttpController {
  constructor(@Inject(CHAT_SERVICE) private chattingService: ChatService) {}

  @Post(":id")
  async addChatting(@Param('id') user_id : number, @Body() chattingRequest : RequestMessage) {
    return await this.chattingService.createChatting(chattingRequest, {id : user_id} , {id : chattingRequest.room_id});
  }

  @UseInterceptors(ReadChatCacheInterceptor)
  @Get(":room_id")
  @ApiOperation({
    summary: "방 ID로 채팅리스트들을 가져옵니다. API",
    description: "방 ID로 채팅리스트들을 가져옵니다.",
  })
  @ApiCreatedResponse({
    description: "방 ID로 채팅리스트들을 가져옵니다.",
    type: Array<ChattingResponse[]>,
  })
  async GetChattingList(
    @Param("room_id") id: number,
    @Query("cursor") cursor: number
  ): Promise<ChattingResponse[]> {
    return await this.chattingService.getChattingList({id, cursor});
  }
}
