import {Controller, Get, Inject, Param, Query, UseInterceptors} from "@nestjs/common";
import { UseGuards } from "@nestjs/common";
import { ApiOperation, ApiCreatedResponse, ApiTags } from "@nestjs/swagger";
import { ReadChatCacheInterceptor } from "../interceptors/chatting.readchat.cache.interceptor";
import { JwtGuard } from "@app/authorization/guards/authorization.jwt.guard";
import {ChattingResponse} from "../dto/chat.dto";
import {ChatService} from "../providers/chat.service.interface";
import {CHAT_SERVICE} from "../chat.metadata";

@Controller("chatting")
@UseGuards(JwtGuard)
@ApiTags("채팅리스트")
export class ChatHttpController {
  constructor(@Inject(CHAT_SERVICE) private chattingService: ChatService) {}

  @UseInterceptors(ReadChatCacheInterceptor)
  @Get(":id")
  @ApiOperation({
    summary: "방 ID로 채팅리스트들을 가져옵니다. API",
    description: "방 ID로 채팅리스트들을 가져옵니다.",
  })
  @ApiCreatedResponse({
    description: "방 ID로 채팅리스트들을 가져옵니다.",
    type: Array<ChattingResponse[]>,
  })
  async GetChattingList(
    @Param("id") id: number,
    @Query("cursor") cursor: number
  ): Promise<ChattingResponse[]> {
    return await this.chattingService.getChattingList({id, cursor});
  }
}
