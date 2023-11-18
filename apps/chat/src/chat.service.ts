import { Injectable, Inject, Logger, LoggerService } from "@nestjs/common";
import { ChattingTypeORM, RoomTypeORM } from "@app/common/typeorm/entity";
import { ParticipantTypeORM } from "@app/common/typeorm/entity";
import { UserTypeORM } from "@app/common/typeorm/entity";

import { Equal, Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { RequestMessage } from "@app/common/dto/chatting.dto";
import { ChattingListRequest } from "@app/common/dto/chat";

@Injectable()
export class ChatService {
  constructor(
    @InjectRepository(ChattingTypeORM)
    private chattingRepository: Repository<ChattingTypeORM>,

    @InjectRepository(ParticipantTypeORM)
    private participantRepository: Repository<ParticipantTypeORM>,

    @Inject(Logger)
    private readonly logger: LoggerService
  ) {}

  async createChatting(
    requestMessage: RequestMessage,
    user: UserTypeORM,
    room: RoomTypeORM
  ): Promise<ChattingTypeORM> {
    const participantsCount = await this.participantRepository.count({
      where: {
        room: { id: room.id },
      },
    });
    const not_read_chat = participantsCount - 1; // 자기자신은 제외
    const chatting = await this.chattingRepository.create({
      user,
      room,
      message: requestMessage.message,
      messageType: requestMessage.messageType,
      not_read_chat,
    });
    return this.chattingRepository.save(chatting);
  }

  async findChattingById(id: number): Promise<ChattingTypeORM> {
    return await this.chattingRepository.findOne({
      where: { id },
      relations: ["readBys"],
    });
  }

  async findChattingsByRoomId(id: number): Promise<ChattingTypeORM[]> {
    return await this.chattingRepository.find({
      where: { room: { id } },
      relations: ["readBys"],
    });
  }

  async updateChatting(chat: ChattingTypeORM): Promise<ChattingTypeORM> {
    return await this.chattingRepository.save(chat);
  }

  async readChatting(
    user: UserTypeORM,
    room: RoomTypeORM
  ): Promise<ChattingTypeORM[]> {
    return await this.chattingRepository.find({
      where: { user: { id: user.id }, room: { id: room.id } },
    });
  }

  async getChattingList(payload: ChattingListRequest): Promise<any[]> {
    if ((payload.cursor as any) == "null") {
      payload.cursor = 9999999999;
    }

    const { id, cursor } = payload;

    this.logger.log(`DB에서 채팅 기록을 조회 합니다. RoomID : ${id}`);
    const chatList = await this.chattingRepository
      .createQueryBuilder("chatting")
      .where("chatting.room_id = :id", { id })
      .andWhere("chatting.id < :cursor", { cursor: cursor }) // 추가된 부분
      .leftJoinAndSelect("chatting.user", "user")
      .select([
        "chatting.id",
        "chatting.message",
        "chatting.not_read_chat",
        "chatting.createdAt",
        "user.id",
        "chatting.room_id",
      ])
      .orderBy("chatting.id", "DESC") // 정렬 추가
      .limit(50) // 추가된 부분
      .getRawMany();
    return chatList
      .map((chat) => ({
        id: chat.chatting_id,
        room_id: chat.room_id,
        user_id: chat.user_id,
        message: chat.chatting_message,
        not_read: chat.chatting_not_read,
        createdAt: chat.chatting_createdAt,
      }))
      .reverse();
  }
}
