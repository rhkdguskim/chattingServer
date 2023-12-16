import {
  Injectable,
  BadRequestException,
  Logger,
  Inject,
  LoggerService,
  ForbiddenException,
} from "@nestjs/common";
import { RoomTypeORM } from "@app/common/typeorm/entity";
import { ParticipantTypeORM } from "@app/common/typeorm/entity";
import { EntityManager, Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import {
  CreateRoomReqeust,
  CreateRoomResponse,
  RoomType,
  RoomListResponse,
  InviteRoomRequest,
} from "@app/common/dto/room.dto";
import { UserTypeORM } from "@app/common/typeorm/entity";

import { ValidateCreateRoom } from "@app/common/decoration/room.deco";
import {UserResponse} from "@app/authentication/dto/authenticaion.dto";

@Injectable()
export class RoomService {
  constructor(
    @Inject(EntityManager) private readonly manager: EntityManager,

    @InjectRepository(RoomTypeORM)
    private roomRepository: Repository<RoomTypeORM>,
    @InjectRepository(ParticipantTypeORM)
    private participantRepository: Repository<ParticipantTypeORM>,

    @Inject(Logger)
    private readonly logger: LoggerService
  ) {}

  @ValidateCreateRoom()
  async createRoom(
    createRoomDto: CreateRoomReqeust
  ): Promise<CreateRoomResponse> {
    const participantCount = createRoomDto.participant.length;
    let determinedType: RoomType;
    if (participantCount === 1) {
      this.logger.log("개인방을 생성합니다.");
      determinedType = RoomType.Individual;
    } else if (participantCount === 2) {
      this.logger.log("1:1 채팅방을 생성합니다.");
      determinedType = RoomType.two;
    } else if (participantCount >= 3) {
      this.logger.log("그룹채팅방 생성합니다.");
      determinedType = RoomType.Group;
    } else {
      throw new ForbiddenException(
        "참가자가 없는 채팅방은 생성 할 수 없습니다."
      );
    }

    // 채팅방 + 참가자 트랜잭션 구현
    return await this.manager.transaction(
      async (transactionalEntityManager) => {
        const newRoom: RoomTypeORM = transactionalEntityManager.create(
          RoomTypeORM,
          {
            owner_id: createRoomDto.id,
            type: determinedType,
            last_chat: "",
          }
        );
        const createdRoom: RoomTypeORM = await transactionalEntityManager.save(
          RoomTypeORM,
          newRoom
        );

        for (const participantUser of createRoomDto.participant) {
          const newParticipant = transactionalEntityManager.create(
            ParticipantTypeORM,
            {
              user: participantUser,
              room: createdRoom,
              room_name: createRoomDto.room_name,
            }
          );

          await transactionalEntityManager.save(
            ParticipantTypeORM,
            newParticipant
          );
        }
        const roomResponse: CreateRoomResponse = {
          ...createdRoom,
          room_name: createRoomDto.room_name,
        };
        return roomResponse;
      }
    );
  }

  async InviteRoom(
    inviteToRoom: InviteRoomRequest
  ): Promise<ParticipantTypeORM[]> {
    const results: ParticipantTypeORM[] = [];
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
  async GetParticipants(user: UserTypeORM): Promise<ParticipantTypeORM[]> {
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

  async getRoombyID(id: number): Promise<RoomTypeORM | undefined> {
    return this.roomRepository.findOne({ where: { id } });
  }

  async updateRoomStatus(room: RoomTypeORM): Promise<RoomTypeORM> {
    return this.roomRepository.save(room);
  }
}
