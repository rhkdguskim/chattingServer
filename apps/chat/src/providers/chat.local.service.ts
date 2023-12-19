import {Inject, Injectable, Logger, LoggerService} from "@nestjs/common";
import {ChatRoomInfo, ChattingListRequest, ChattingResponse, ChatUserInfo, RequestMessage} from "../dto/chat.dto";
import {ChatService} from "./chat.service.interface";
import {CHAT_REPOSITORY, ROOM_REPOSITORY} from "@app/chat/chat.metadata";
import {RoomTransactionRepository} from "@app/chat/repository/room.repository.interface";
import {ChatRepository} from "@app/chat/repository/chat.repository.interface";
import {ChatEntity} from "@app/chat/entity/chatting.entity";
import {RoomEntity} from "@app/chat/entity/room.entity";
import {UserEntity} from "@app/authentication/entity/users.entity";

@Injectable()
export class ChatLocalService implements ChatService {
  constructor(
    @Inject(CHAT_REPOSITORY)
    private chattingRepository: ChatRepository,

    @Inject(ROOM_REPOSITORY)
    private roomRepository: RoomTransactionRepository,

    @Inject(Logger)
    private readonly logger: LoggerService
  ) {}

  async createChatting(
      requestMessage: RequestMessage,
      user: ChatUserInfo,
      room: ChatRoomInfo
  ): Promise<ChatEntity> {

    const participantsCount = await this.roomRepository.countParticipantsByRoomID(room.id);

    const not_read_chat = participantsCount - 1; // 자기자신은 제외

    return await this.chattingRepository.create({
      user : user as UserEntity,
      room : room as RoomEntity,
      message: requestMessage.message,
      messageType: requestMessage.messageType,
      not_read_chat,
    });
  }

  async findChattingById(id: number): Promise<ChatEntity> {
    return await this.chattingRepository.findChattingById(id);
  }

  async findChattingByRoomID(id: number): Promise<ChatEntity[]> {
    return await this.chattingRepository.findChattingByRoomId(id)
  }

  async updateChatting(chat: ChatEntity): Promise<boolean> {
    return await this.chattingRepository.update(chat.id, chat) as boolean
  }

  async readChatting(
      user: UserEntity,
      room: RoomEntity
  ): Promise<ChatEntity[]> {
    return await this.chattingRepository.readChatting(user.id, room.id)
  }

  async getChattingList(payload: ChattingListRequest): Promise<ChattingResponse[]> {
      const chatting = await this.chattingRepository.getChattingList(payload)
      return chatting.map(chat => {
          return new ChattingResponse(chat)
      })
  }
}
