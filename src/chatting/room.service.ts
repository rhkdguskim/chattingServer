import {
  Injectable,
  ForbiddenException,
  HttpStatus,
  ConflictException,
  BadRequestException,
  Logger,
  Inject,
  LoggerService,
} from "@nestjs/common";
import { Room } from "./room.entity";
import { Participant } from "./participant.entity";
import { Repository, FindOneOptions } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { CreateRoom } from "./dto/chatting.createRoom.dto";
import { User } from "src/users/users.entity";
import { InviteToRoom } from "./dto/chatting.inviteToRoom.dto";
import { RoomType } from "./dto/room.type.dto";
import { Chatting } from "./chatting.entity";
import { RoomListResponse } from "./dto/room.roomListResponse.dto";
import { UsersService } from "src/users/users.service";
import { UserResponse } from "src/users/dto/users.userresponse.dto";

@Injectable()
export class RoomService {
  constructor(
    @InjectRepository(Room)
    private roomRepository: Repository<Room>,
    @InjectRepository(Participant)
    private participantRepository: Repository<Participant>,
    @InjectRepository(Chatting)
    private chattingRepository: Repository<Chatting>,

    @Inject(Logger)
    private readonly logger: LoggerService
  ) {}

  async createRoom(createRoomDto: CreateRoom, user: User): Promise<Room> {
    const participantCount = createRoomDto.participant.length;
    let determinedType: RoomType;
    if (participantCount === 1) {
      determinedType = RoomType.Individual;
    } else if (participantCount === 2) {
      determinedType = RoomType.two;
    } else {
      determinedType = RoomType.Group;
    }

    const alreadyRoom = await this.validateRoomCreation(
      createRoomDto,
      determinedType
    );
    if (alreadyRoom) {
      return alreadyRoom;
    }
    const room = await this.createBaseRoom(determinedType, user);
    await this.addParticipantsToRoom(
      room,
      createRoomDto.participant,
      createRoomDto.room_name
    );
    return room;
  }

  private async validateRoomCreation(
    createRoomDto: CreateRoom,
    roomType: RoomType
  ): Promise<Room> {
    const { participant } = createRoomDto;

    // 개인 및 1:1 채팅방의 경우 중복 체크
    if (roomType === RoomType.Individual || roomType === RoomType.two) {
      return await this.findExistingRoom(participant, roomType);
    }
  }

  private async findExistingRoom(
    participants: User[],
    type: RoomType
  ): Promise<Room | undefined> {
    const participantIds = participants.map((p) => p.id);
    return await this.roomRepository
      .createQueryBuilder("room")
      .innerJoin("room.participant", "participant")
      .innerJoin("participant.user", "user")
      .where("room.type = :type", { type })
      .andWhere("user.id IN (:...participantIds)", { participantIds }) // AND 조건으로 추가
      .groupBy("room.id") // 그룹화 추가
      .having(`COUNT(participant.id) = ${participants.length}`) // 참가자 수와 비교하여 필터링
      .getOne();
  }

  private async createBaseRoom(type: RoomType, user: User): Promise<Room> {
    const newRoom = this.roomRepository.create({
      owner_id: user.user_id,
      type,
      last_chat: "",
    });
    return await this.roomRepository.save(newRoom);
  }

  private async addParticipantsToRoom(
    room: Room,
    participants: User[],
    room_name: string
  ): Promise<void> {
    for (const participantUser of participants) {
      const newParticipant = this.participantRepository.create({
        user: participantUser,
        room,
        room_name,
      });
      await this.participantRepository.save(newParticipant);
    }
  }

  async InviteRoom(inviteToRoom: InviteToRoom): Promise<Participant[]> {
    const results: Participant[] = [];
    const { room, room_name, participants } = inviteToRoom;

    // 해당 방이 그룹 채팅방인지 확인
    if (room.type !== RoomType.Group) {
      throw new BadRequestException(
        "Only group chat rooms can invite participants."
      );
    }

    for (const user of participants) {
      const instance = this.participantRepository.create({
        user,
        room,
        room_name,
      });

      const participant = await this.participantRepository.save(instance);
      results.push(participant);
    }

    return results;
  }

  // 자기자신이 참가한 채팅방 Participant와 Room와 Join 하여 결과 출력
  async GetParticipants(user: User): Promise<Participant[]> {
    const rommInfo = await this.participantRepository
      .createQueryBuilder("participant")
      .where({ user: { id: user.id } })
      .innerJoinAndSelect("participant.room", "room")
      .getMany();
    return rommInfo;
  }

  async GetRooms(user: User): Promise<Array<RoomListResponse>> {
    // 자기자신이 포함된 Room의 정보를 가져옵니다. (자신의 아이디로 Participant를 검색한다.)
    const myRoomList = await this.participantRepository
      .createQueryBuilder("participant")
      .where("participant.user_id = :id", { id: user.id })
      .innerJoinAndSelect("participant.room", "room")
      .getMany();

    // 검색된 participant의 room의 정보를 가지고 와서 Room의 참가자 목록을 검색한다.
    const response: Array<RoomListResponse> = await Promise.all(
      myRoomList.map(async (participant) => {
        const result = await this.participantRepository
          .createQueryBuilder("participant")
          .where("participant.room_id = :id", { id: participant.room.id })
          .innerJoinAndSelect("participant.user", "user")
          .getMany();

        const userList: Array<UserResponse> = await Promise.all(
          result.map((newresult) => {
            const user = newresult.user;
            const parseUser: UserResponse = {
              id: user.id,
              name: user.name,
              user_id: user.user_id,
              status_msg: user.status_msg,
              profile_img_url: user.profile_img_url,
              background_img_url: user.background_img_url,
            };
            return parseUser;
          })
        );

        const newUser: RoomListResponse = {
          id: participant.room.id,
          room_name: participant.room_name,
          type: participant.room.type,
          owner_id: participant.room.owner_id,
          last_chat: participant.room.last_chat,
          not_read_chat: 0,
          last_read_chat_id: 0,
          updatedAt: participant.room.updatedAt,
          participant: userList,
        };
        return newUser;
      })
    );
    return response;
  }

  async getRoom(id: number): Promise<Room | undefined> {
    return this.roomRepository.findOne({ where: { id } });
  }

  async updateRoomStatus(room: Room): Promise<Room> {
    return this.roomRepository.save(room);
  }

  async getChattingList(id: number, cursor: number): Promise<any[]> {
    if ((cursor as any) == "null") {
      cursor = 9999999999;
    }

    this.logger.log(`DB에서 채팅 기록을 조회 합니다. RoomID : ${id}`)
    const chatList = await this.chattingRepository
      .createQueryBuilder("chatting")
      .where("chatting.room_id = :id", { id })
      .andWhere("chatting.id < :cursor", { cursor: cursor }) // 추가된 부분
      .leftJoinAndSelect("chatting.user", "user")
      .select([
        "chatting.id",
        "chatting.message",
        "chatting.not_read",
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
