import { RoomEntity } from "@app/chat/entity/room.entity";
import {
  CreateRoomRequest,
  CreateRoomResponse,
  DeleteRoomRequest,
  InviteRoomRequest,
  RoomInfoResponse,
} from "@app/chat/dto/room.dto";
import { RoomTypeORM } from "@app/common/typeorm/entity/room.typeorm.entity";
import { ParticipantEntity } from "@app/chat/entity/participant.entity";

export interface RoomRepository {
  getRoomByID(id: number): Promise<RoomEntity>;

  updateRoom(room: Partial<RoomEntity>): Promise<boolean>;

  getParticipantByUserID(id: number): Promise<ParticipantEntity[]>;

  getParticipantByRoomID(id: number): Promise<ParticipantEntity[]>;

  getRoomInfoByParticipants(
    user_id: number,
    createRoom: CreateRoomRequest
  ): Promise<RoomTypeORM>;

  getUserRoom(user_id: number): Promise<Array<RoomInfoResponse>>;

  inviteRoom(inviteToRoomDto: InviteRoomRequest): Promise<ParticipantEntity[]>;

  createRoom(
    user_id: number,
    createRoomDto: CreateRoomRequest
  ): Promise<CreateRoomResponse>;

  countParticipantsByRoomID(id: number): Promise<number>;

  deleteRoom(deleteRoom: DeleteRoomRequest): Promise<boolean>;
}
