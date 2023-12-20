import { Inject, Injectable } from "@nestjs/common";
import { EntityManager } from "typeorm";
import {
  CreateRoomRequest,
  CreateRoomResponse,
  DeleteRoomRequest,
  InviteRoomRequest,
  ParticipantUserInfo,
  RoomInfoResponse,
} from "../dto/room.dto";
import { RoomService } from "./room.service.interface";
import { ROOM_REPOSITORY } from "@app/chat/chat.metadata";
import { RoomRepository } from "@app/chat/repository/room.repository.interface";
import { RoomEntity, RoomType } from "@app/chat/entity/room.entity";
import { ParticipantEntity } from "../entity/participant.entity";
import {
  ChatServerException,
  ChatServerExceptionCode,
} from "@app/common/exception/chatServerException";

const INDIVIDUAL_CHAT_CNT = 1;
const TWO_CHAT_CNT = 2;

@Injectable()
export class RoomServiceImpl implements RoomService {
  constructor(
    @Inject(EntityManager) private readonly manager: EntityManager,
    @Inject(ROOM_REPOSITORY)
    private roomRepository: RoomRepository
  ) {}

  deleteRoom(deleteRoom: DeleteRoomRequest): Promise<boolean> {
    throw new Error("Method not implemented.");
  }

  getParticipantByUserID(id: number): Promise<ParticipantEntity[]> {
    return this.roomRepository.getParticipantByUserID(id);
  }

  async createRoom(
    user_id: number,
    createRoomDto: CreateRoomRequest
  ): Promise<CreateRoomResponse> {
    const room_type = this.GetRoomType(createRoomDto.participant);
    createRoomDto.participant = this.GetParticipant(user_id, createRoomDto);

    if (await this.AlreadyRoom(user_id, room_type, createRoomDto)) {
      throw new ChatServerException({
        code: ChatServerExceptionCode.Already_Exist,
        message: "Room is Already Exist",
      });
    }

    return await this.roomRepository.createRoom(
      user_id,
      new CreateRoomRequest({
        ...createRoomDto,
        room_type,
      })
    );
  }

  async InviteRoom(
    inviteToRoom: InviteRoomRequest
  ): Promise<ParticipantEntity[]> {
    if (this.GetRoomType(inviteToRoom.participants) !== RoomType.GROUP) {
      throw new ChatServerException({
        code: ChatServerExceptionCode.Forbidden,
        message: "Only group chat rooms can invite participants.",
      });
    }

    return await this.roomRepository.inviteRoom(inviteToRoom);
  }

  async GetUserRooms(user_id: number): Promise<Array<RoomInfoResponse>> {
    return this.roomRepository.getUserRoom(user_id);
  }

  async getRoomByID(id: number): Promise<RoomEntity> {
    return await this.roomRepository.getRoomByID(id);
  }

  async updateRoomStatus(room: RoomEntity): Promise<boolean> {
    return await this.roomRepository.updateRoom(room);
  }

  private GetRoomType(participants: ParticipantUserInfo[]): RoomType {
    switch (participants.length) {
      case INDIVIDUAL_CHAT_CNT:
        return RoomType.INDIVIDUAL;
      case TWO_CHAT_CNT:
        return RoomType.TWO;
      default:
        return RoomType.GROUP;
    }
  }

  private GetParticipant(
    user_id: number,
    createRoom: CreateRoomRequest
  ): ParticipantUserInfo[] {
    const currentUserExists = createRoom.participant.find(
      (participant) => participant.id === user_id
    );
    if (!currentUserExists) {
      createRoom.participant.push(
        new ParticipantUserInfo({
          id: user_id,
        })
      );
    }

    return createRoom.participant.map(
      (participant) => new ParticipantUserInfo(participant)
    );
  }

  private async AlreadyRoom(
    user_id: number,
    room_type: RoomType,
    createRoom: CreateRoomRequest
  ): Promise<boolean> {
    if (room_type == RoomType.GROUP) {
      return false;
    } else {
      const roomInfo = await this.roomRepository.getRoomInfoByParticipants(
        user_id,
        createRoom
      );
      return roomInfo != null;
    }
  }
}
