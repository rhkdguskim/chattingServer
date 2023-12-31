import { Repository } from "@app/common/database/typeorm.repository.interface";
import { ChatEntity } from "@app/chat/entity/chatting.entity";
import { ChattingListRequest, ChattingResponse } from "@app/chat/dto/chat.dto";

export interface ChatRepository extends Repository<ChatEntity> {
  findChattingById(id: number): Promise<ChatEntity>;
  findChattingByRoomId(id: number): Promise<ChatEntity[]>;
  readChatting(user_id: number, room_id: number): Promise<ChatEntity[]>;
  getChattingList(
    chatListRequest: ChattingListRequest
  ): Promise<ChattingResponse[]>;
}
