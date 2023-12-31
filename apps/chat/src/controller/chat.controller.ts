import {
  Body,
  Controller,
  Get,
  Inject,
  Param,
  Post,
  Query,
  UseGuards,
  UseInterceptors,
} from "@nestjs/common";
import {
  ApiCreatedResponse,
  ApiOperation,
  ApiSecurity,
  ApiTags,
} from "@nestjs/swagger";
import { ReadChatCacheInterceptor } from "../interceptors/chatting.readchat.cache.interceptor";
import { JwtGuard } from "@lib/common/guard/authorization.jwt.guard";
import { ChattingResponse, RequestMessage } from "../dto/chat.dto";
import { ChatService } from "../providers/chat.service.interface";
import { CHAT_SERVICE } from "../chat.metadata";
import { SelfGuard } from "@lib/common/guard/authorization.self.guard";

@Controller("chatting")
@UseGuards(JwtGuard, SelfGuard)
@ApiSecurity("authentication")
@ApiTags("chatting")
export class ChatControllerImpl {
  constructor(@Inject(CHAT_SERVICE) private chattingService: ChatService) {}

  @Post(":id")
  async addChatting(
    @Param("id") user_id: number,
    @Body() chattingRequest: RequestMessage
  ) {
    return await this.chattingService.createChatting(user_id, chattingRequest);
  }

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
    @Param("id") user_id: number,
    @Query("room_id") room_id: number,
    @Query("cursor") cursor: number
  ): Promise<ChattingResponse[]> {
    return await this.chattingService.getChattingList({ id: room_id, cursor });
  }
}
