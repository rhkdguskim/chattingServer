import {Inject, Injectable, Logger, LoggerService} from "@nestjs/common";
import {ChattingListRequest, ChattingResponse, RequestMessage} from "../dto/chat.dto";
import {ChatService} from "./chat.service.interface";
import {CHAT_REPOSITORY, ROOM_REPOSITORY} from "@app/chat/chat.metadata";
import {RoomTransactionRepository} from "@app/chat/repository/room.repository.interface";
import {ChatRepository} from "@app/chat/repository/chat.repository.interface";
import {Chatting} from "@app/chat/entity/chatting.entity";
import {Room} from "@app/chat/entity/room.entity";
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
      user: UserEntity,
      room: Room
  ): Promise<Chatting> {

    const participantsCount = await this.roomRepository.countParticipantsByRoomID(room.id);

    const not_read_chat = participantsCount - 1; // 자기자신은 제외

    return await this.chattingRepository.create({
      user,
      room,
      message: requestMessage.message,
      messageType: requestMessage.messageType,
      not_read_chat,
    });
  }

  async findChattingById(id: number): Promise<Chatting> {
    return await this.chattingRepository.findChattingById(id);
  }

  async findChattingByRoomID(id: number): Promise<Chatting[]> {
    return await this.chattingRepository.findChattingByRoomId(id)
  }

  async updateChatting(chat: Chatting): Promise<boolean> {
    return await this.chattingRepository.update(chat.id, chat) as boolean
  }

  async readChatting(
      user: UserEntity,
      room: Room
  ): Promise<Chatting[]> {
    return await this.chattingRepository.readChatting(user.id, room.id)
  }

  async getChattingList(payload: ChattingListRequest): Promise<ChattingResponse[]> {
      if ((payload.cursor as any) == "null") {
          payload.cursor = 9999999999;
      }
      const chatting = await this.chattingRepository.getChattingList(payload)
      return chatting.map(chat => {
          return {
              id : chat.id,
              room_id: chat.room.id,
              user_id: chat.user.id,
              message: chat.message,
              not_read_chat: chat.not_read_chat,
              createdAt: chat.createdAt
          }
      })
  }
}
