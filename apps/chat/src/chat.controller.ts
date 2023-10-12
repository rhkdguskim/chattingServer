import {Controller} from "@nestjs/common";
import { ChatService } from "./chat.service";
import {ChattingResponse} from "@app/common/dto/chatting.dto";
import {MessagePattern} from "@nestjs/microservices";
import {FIND_CHATTLING_ALL} from "@app/common/message/chat";
import {ChattingListRequest} from "@app/common/dto/chat";

@Controller()
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @MessagePattern({cmd: FIND_CHATTLING_ALL})
  async GetChattingList(payload : ChattingListRequest): Promise<ChattingResponse[]> {
    return await this.chatService.getChattingList(payload);
  }
}
