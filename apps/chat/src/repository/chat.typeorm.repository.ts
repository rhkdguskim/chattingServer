import { Injectable } from "@nestjs/common";
import { TypeormRepository } from "@app/common/database/typeorm.repository";
import { ChattingTypeORM } from "@app/common/database/entity/chatting.typeorm.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { ChatRepository } from "@app/chat/repository/chat.repository.interface";
import { ChattingListRequest, ChattingResponse } from "../dto/chat.dto";
import { ChatEntity } from "@app/chat/entity/chatting.entity";

@Injectable()
export class ChatTypeormRepository
  extends TypeormRepository<ChatEntity>
  implements ChatRepository
{
  constructor(
    @InjectRepository(ChattingTypeORM)
    private chatRepository: Repository<ChattingTypeORM>
  ) {
    super(chatRepository);
  }

  async create(data: Partial<ChatEntity>): Promise<ChatEntity> {
    return new ChatEntity(await super.create(data));
  }

  async findChattingById(id: number): Promise<ChatEntity> {
    return new ChatEntity(
      await this.chatRepository.findOne({
        where: { id },
        relations: ["readBys"],
      })
    );
  }
  async findChattingByRoomId(id: number): Promise<ChatEntity[]> {
    const chatting = await this.chatRepository.find({
      where: { room: { id } },
      relations: ["readBys"],
    });
    return chatting.map((chat) => {
      return new ChatEntity(chat);
    });
  }
  async readChatting(user_id: number, room_id: number): Promise<ChatEntity[]> {
    const chatting = await this.chatRepository.find({
      where: { user: { id: user_id }, room: { id: room_id } },
    });
    return chatting.map((chat) => {
      return new ChatEntity(chat);
    });
  }
  async getChattingList(
    chatListRequest: ChattingListRequest
  ): Promise<ChattingResponse[]> {
    const { id, cursor } = chatListRequest;
    const chatList = await this.chatRepository
      .createQueryBuilder("chat")
      .where("chat.room_id = :id", { id })
      .andWhere("chat.id < :cursor", { cursor: cursor })
      .leftJoinAndSelect("chat.user", "user")
      .select([
        "chat.id as id",
        "chat.message as message",
        "chat.not_read_chat as not_read_chat",
        "chat.createdAt as createdAt",
        "chat.user as user_id",
        "chat.room_id as room_id",
      ])
      .orderBy("chat.id", "DESC")
      .limit(50)
      .getRawMany();
    return chatList.reverse().map((chat) => {
      return new ChattingResponse({
        createdAt: chat.createdAt,
        id: chat.id,
        message: chat.message,
        not_read_chat: chat.not_read_chat,
        room: { id: chat.room_id },
        user: { id: chat.user_id },
      });
    });
  }
}
