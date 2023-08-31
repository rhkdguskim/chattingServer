import { Injectable, ForbiddenException, HttpStatus, Inject, Logger, LoggerService } from "@nestjs/common";
import { Chatting } from "./chatting.entity";
import { Room } from "./room.entity";
import { Participant } from "./participant.entity";
import { Equal, Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { InviteToRoom } from "./dto/chatting.inviteToRoom.dto";
import { RequestMessage } from "./dto/chatting.message.dto";
import { User } from "src/users/users.entity";
import { RoomService } from "./room.service";

@Injectable()
export class ChattingService {
  constructor(
    @InjectRepository(Chatting)
    private chattingRepository: Repository<Chatting>,

    @InjectRepository(Participant)
    private participantRepository: Repository<Participant>,
    
    @Inject(Logger)
    private readonly logger: LoggerService,
  ) {}

  async createChatting(
    requestMessage: RequestMessage,
    user: User,
    room: Room
  ): Promise<Chatting> {
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
      not_read_chat,
    });
    return this.chattingRepository.save(chatting);
  }

  async findChattingById(id: number): Promise<Chatting> {
    return await this.chattingRepository.findOne({
      where: { id },
      relations: ["readBys"],
    });
  }

  async findChattingsByRoomId(id: number): Promise<Chatting[]> {
    return await this.chattingRepository.find({
      where: { room: { id } },
      relations: ["readBys"],
    });
  }

  async updateChatting(chat: Chatting): Promise<Chatting> {
    return await this.chattingRepository.save(chat);
  }

  async readChatting(user: User, room: Room): Promise<Chatting[]> {
    return await this.chattingRepository.find({
      where: { user: { id: user.id }, room: { id: room.id } },
    });
  }

  async getChattingList(id: number, cursor: number): Promise<any[]> {
    if ((cursor as any) == "null") {
      cursor = 9999999999;
    }

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
