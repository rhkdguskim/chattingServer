import {
  Controller,
  Get,
  Param,
  Query,
  UseInterceptors,
} from "@nestjs/common";
import { UseGuards } from "@nestjs/common";
import { ApiOperation, ApiCreatedResponse, ApiTags } from "@nestjs/swagger";
import { Chatting } from "./chatting.entity";
import { JwtAuthGuard } from "@src/auth/jwt.auth.guard";
import { ChatCacheInterceptor } from "@src/core/interceptors/chatcache.interceptor";
import { CacheAction } from "@src/core/interceptors/cache-decorator";
import { ChattingService } from "./chatting.service";

@Controller("chatting")
@UseGuards(JwtAuthGuard)
@ApiTags("채팅리스트")
export class ChattingController {
  constructor(private chattingService: ChattingService) {}

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
