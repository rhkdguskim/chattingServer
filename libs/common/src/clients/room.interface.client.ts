import {
  RoomListResponse,
  CreateRoomReqeust,
  CreateRoomResponse,
  InviteRoomRequest,
} from "../dto/room.dto";
import { Participant, Room, User } from "../entity";

export interface IRoomClient {
  GetRoomList(payload: number): Promise<Array<RoomListResponse>>;
  findRoom(payload: number): Promise<Array<RoomListResponse>>;
  updateRoom(payload: Room): Promise<Room>;
  CreateRoom(payload: CreateRoomReqeust): Promise<CreateRoomResponse>;
  InviteRoom(payload: InviteRoomRequest): Promise<Participant[]>;
  findParticipant(payload: User): Promise<Participant[]>;
}
