import { Controller } from "@nestjs/common";
import { ChatLocalService } from "../providers/chat.local.service";
import { MessagePattern } from "@nestjs/microservices";
import { FIND_CHATTLING_ALL } from "../chat.message";
import {ChattingListRequest, ChattingResponse} from "../dto/chat.dto";

@Controller()
export class ChatMicroserviceController {
  constructor(private readonly chatService: ChatLocalService) {}

  @MessagePattern({ cmd: FIND_CHATTLING_ALL })
  async GetChattingList(
    payload: ChattingListRequest
  ): Promise<ChattingResponse[]> {
    return await this.chatService.getChattingList(payload);
  }
}
