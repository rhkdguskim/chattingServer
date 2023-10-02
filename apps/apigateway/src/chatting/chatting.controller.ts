import { Controller, Get, Param, Query, UseInterceptors } from "@nestjs/common";
import { UseGuards } from "@nestjs/common";
import { ApiOperation, ApiCreatedResponse, ApiTags } from "@nestjs/swagger";
import { Chatting } from "../entitys/chatting.entity";
import { ChattingService } from "./chatting.service";
import { AuthGuard } from "@nestjs/passport";
import { ReadChatCacheInterceptor } from "./interceptors/chatting.readchat.cache.interceptor";
import { ChattingResponse } from "./dto/chatting.dto";

@Controller("chatting")
@UseGuards(AuthGuard("jwt"))
@ApiTags("채팅리스트")
export class ChattingController {
  constructor(private chattingService: ChattingService) {}

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
    return await this.chattingService.getChattingList(id, cursor);
  }
}
