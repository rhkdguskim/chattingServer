import { Controller } from "@nestjs/common";
import { ChatServiceImpl } from "../providers/chat.service";
import { MessagePattern } from "@nestjs/microservices";
import { FIND_CHATTLING_ALL } from "../chat.message";
import { ChattingListRequest, ChattingResponse } from "../dto/chat.dto";

@Controller()
export class ChatMicroController {
  constructor(private readonly chatService: ChatServiceImpl) {}

  @MessagePattern({ cmd: FIND_CHATTLING_ALL })
  async GetChattingList(
    payload: ChattingListRequest
  ): Promise<ChattingResponse[]> {
    return await this.chatService.getChattingList(payload);
  }
}
