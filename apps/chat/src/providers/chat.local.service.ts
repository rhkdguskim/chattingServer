import {Inject, Injectable, Logger, LoggerService} from "@nestjs/common";
import {Repository} from "typeorm";
import {InjectRepository} from "@nestjs/typeorm";
import {ChattingListRequest, RequestMessage} from "../dto/chat.dto";
import {ChattingTypeORM} from "@app/common/typeorm/entity/chatting.typeorm.entity";
import {ParticipantTypeORM} from "@app/common/typeorm/entity/participant.typeorm.entity";
import {UserTypeORM} from "@app/authentication/entity/users.typeorm.entity";
import {RoomTypeORM} from "@app/common/typeorm/entity/room.typeorm.entity";
import {ChatService} from "./chat.service.interface";

@Injectable()
export class ChatLocalService implements ChatService {
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
        room: {id: room.id},
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
      where: {id},
      relations: ["readBys"],
    });
  }

  async findChattingsByRoomId(id: number): Promise<ChattingTypeORM[]> {
    return await this.chattingRepository.find({
      where: {room: {id}},
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
      where: {user: {id: user.id}, room: {id: room.id}},
    });
  }

  async getChattingList(payload: ChattingListRequest): Promise<any[]> {
    if ((payload.cursor as any) == "null") {
      payload.cursor = 9999999999;
    }

    const {id, cursor} = payload;

    this.logger.log(`DB에서 채팅 기록을 조회 합니다. RoomID : ${id}`);
    const chatList = await this.chattingRepository
        .createQueryBuilder("chatting")
        .where("chat.room_id = :id", {id})
        .andWhere("chat.id < :cursor", {cursor: cursor}) // 추가된 부분
        .leftJoinAndSelect("chat.user", "user")
        .select([
          "chat.id",
          "chat.message",
          "chat.not_read_chat",
          "chat.createdAt",
          "user.id",
          "chat.room_id",
        ])
        .orderBy("chat.id", "DESC") // 정렬 추가
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
