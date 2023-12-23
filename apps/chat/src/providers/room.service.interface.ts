import {
  CreateRoomRequest,
  CreateRoomResponse,
  DeleteRoomRequest,
  InviteRoomRequest,
  RoomInfoResponse,
} from "../dto/room.dto";
import { RoomEntity } from "@app/chat/entity/room.entity";
import { ParticipantEntity } from "@app/chat/entity/participant.entity";

export interface RoomService {
  createRoom(
    user_id: number,
    createRoomDto: CreateRoomRequest
  ): Promise<CreateRoomResponse>;

  InviteRoom(inviteToRoom: InviteRoomRequest): Promise<ParticipantEntity[]>;

  GetUserRooms(user_id: number): Promise<Array<RoomInfoResponse>>;

  getRoomByID(id: number): Promise<RoomEntity>;

  getParticipantByUserID(id: number): Promise<ParticipantEntity[]>;

  updateRoomStatus(room: Partial<RoomEntity>): Promise<boolean>;

  deleteRoom(deleteRoom: DeleteRoomRequest): Promise<boolean>;
}
