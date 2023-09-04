import {
  Injectable,
  BadRequestException,
  Logger,
  Inject,
  LoggerService,
  ForbiddenException,
} from "@nestjs/common";
import { Room } from "@src/entitys/room.entity";
import { Participant } from "@src/entitys/participant.entity";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { CreateRoomReqeust } from "./dto/room.dto";
import { User } from "@src/entitys/users.entity";
import { RoomType } from "./dto/room.dto";
import { RoomListResponse, InviteRoomRequest } from "./dto/room.dto";
import { UserResponse } from "@src/users/dto/users.dto";

@Injectable()
export class RoomService {
  constructor(
    @InjectRepository(Room)
    private roomRepository: Repository<Room>,
    @InjectRepository(Participant)
    private participantRepository: Repository<Participant>,

    @Inject(Logger)
    private readonly logger: LoggerService
  ) {}

  async createRoom(createRoomDto: CreateRoomReqeust, user_id: number): Promise<Room> {

    const participantCount = createRoomDto.participant.length;
    let determinedType: RoomType;
    if (participantCount === 1) {
      this.logger.log("개인방을 생성합니다.")
      determinedType = RoomType.Individual;
    } else if (participantCount === 2) {
      this.logger.log("1:1 채팅방을 생성합니다.")
      determinedType = RoomType.two;
    } else if (participantCount >= 3) {
      this.logger.log("그룹채팅방 생성합니다.")
      determinedType = RoomType.Group;
    }
    else{
      throw new ForbiddenException("참가자가 없는 채팅방은 생성 할 수 없습니다.");
    }

    const alreadyRoom = await this.validateRoomCreation(
      createRoomDto,
      determinedType
    );
    if (alreadyRoom) {
      this.logger.log("이미 생성된 채팅방입니다.")
      return alreadyRoom;
    }
    
    const room = await this.createBaseRoom(determinedType, user_id);
    await this.addParticipantsToRoom(
      room,
      createRoomDto.participant,
      createRoomDto.room_name
    );
    return room;
  }

  private async validateRoomCreation(
    createRoomDto: CreateRoomReqeust,
    roomType: RoomType
  ): Promise<Room> {
    const { participant } = createRoomDto;

    // 개인 및 1:1 채팅방의 경우 중복 체크
    if (roomType === RoomType.Individual || roomType === RoomType.two) {
      return await this.findExistingRoom(participant, roomType);
    }
  }

  private async findExistingRoom(
    participants: UserResponse[],
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

  private async createBaseRoom(type: RoomType, user_id: number): Promise<Room> {
    const newRoom = this.roomRepository.create({
      owner_id: user_id,
      type,
      last_chat: "",
    });
    return await this.roomRepository.save(newRoom);
  }

  private async addParticipantsToRoom(
    room: Room,
    participants: UserResponse[],
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

  async InviteRoom(inviteToRoom: InviteRoomRequest): Promise<Participant[]> {
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

  async GetUserRooms(user_id: number): Promise<Array<RoomListResponse>> {
    // 자기자신이 포함된 Room의 정보를 가져옵니다. (자신의 아이디로 Participant를 검색한다.)
    const myRoomList = await this.participantRepository
      .createQueryBuilder("participant")
      .where("participant.user_id = :id", { id: user_id })
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

  async getRoombyID(id: number): Promise<Room | undefined> {
    return this.roomRepository.findOne({ where: { id } });
  }

  async updateRoomStatus(room: Room): Promise<Room> {
    return this.roomRepository.save(room);
  }
}
