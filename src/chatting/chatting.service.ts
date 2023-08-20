import { Injectable, ForbiddenException, HttpStatus } from "@nestjs/common";
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
    private participantRepository: Repository<Participant>
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
}
