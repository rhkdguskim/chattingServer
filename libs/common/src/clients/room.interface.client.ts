import {
  RoomListResponse,
  CreateRoomReqeust,
  CreateRoomResponse,
  InviteRoomRequest,
} from "../dto/room.dto";
import { ParticipantTypeORM, RoomTypeORM, UserTypeORM } from "../entity/typeorm";

export interface IRoomClient {
  GetRoomList(payload: number): Promise<Array<RoomListResponse>>;
  findRoom(payload: number): Promise<Array<RoomListResponse>>;
  updateRoom(payload: RoomTypeORM): Promise<RoomTypeORM>;
  CreateRoom(payload: CreateRoomReqeust): Promise<CreateRoomResponse>;
  InviteRoom(payload: InviteRoomRequest): Promise<ParticipantTypeORM[]>;
  findParticipant(payload: UserTypeORM): Promise<ParticipantTypeORM[]>;
}
