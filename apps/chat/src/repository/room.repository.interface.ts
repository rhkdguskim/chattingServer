import { RoomEntity } from "@app/chat/entity/room.entity";
import {
  CreateRoomRequest,
  CreateRoomResponse,
  DeleteRoomRequest,
  InviteRoomRequest,
  RoomInfoResponse,
} from "@app/chat/dto/room.dto";
import { RoomTypeORM } from "@app/common/database/entity/room.typeorm.entity";
import { ParticipantEntity } from "@app/chat/entity/participant.entity";

export interface RoomRepository {
  create(
    user_id: number,
    createRoomDto: CreateRoomRequest
  ): Promise<CreateRoomResponse>;

  update(room: Partial<RoomEntity>): Promise<boolean>;

  find(id: number): Promise<RoomEntity>;

  getRooms(user_id: number): Promise<Array<RoomInfoResponse>>;

  getParticipantByUserID(id: number): Promise<ParticipantEntity[]>;

  getParticipantByRoomID(id: number): Promise<ParticipantEntity[]>;

  getRoomInfoByParticipants(
    user_id: number,
    createRoom: CreateRoomRequest
  ): Promise<RoomTypeORM>;

  inviteToRoom(
    inviteToRoomDto: InviteRoomRequest
  ): Promise<ParticipantEntity[]>;

  countParticipantsByRoomID(id: number): Promise<number>;

  deleteRoom(deleteRoom: DeleteRoomRequest): Promise<boolean>;
}
