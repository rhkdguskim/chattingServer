import { ClientTCP, TcpClientOptions } from "@nestjs/microservices";
import { IRoomClient } from "../room.interface.client";
import {
  RoomListResponse,
  CreateRoomReqeust,
  CreateRoomResponse,
  InviteRoomRequest,
} from "@app/common/dto/room.dto";
import { Room, Participant, User } from "@app/common/entity";
import {
  CREATE_ROOM,
  FIND_ALL_PARTICIPANT,
  FIND_ALL_ROOM,
  FIND_ROOM,
  INVITE_ROOM,
  UPDATE_ROOM,
} from "@app/common/message/room";
import { lastValueFrom } from "rxjs";

export class RoomTCPClient extends ClientTCP implements IRoomClient {
  constructor(options: TcpClientOptions["options"]) {
    super(options);
  }
  GetRoomList(payload: number): Promise<RoomListResponse[]> {
    return lastValueFrom<RoomListResponse[]>(
      this.send<RoomListResponse[]>({ cmd: FIND_ALL_ROOM }, payload)
    );
  }
  findRoom(payload: number): Promise<RoomListResponse[]> {
    return lastValueFrom<RoomListResponse[]>(
      this.send<RoomListResponse[]>({ cmd: FIND_ROOM }, payload)
    );
  }
  updateRoom(payload: Room): Promise<Room> {
    return lastValueFrom<Room>(this.send<Room>({ cmd: UPDATE_ROOM }, payload));
  }
  CreateRoom(payload: CreateRoomReqeust): Promise<CreateRoomResponse> {
    return lastValueFrom<CreateRoomResponse>(
      this.send<CreateRoomResponse>({ cmd: CREATE_ROOM }, payload)
    );
  }
  InviteRoom(payload: InviteRoomRequest): Promise<Participant[]> {
    return lastValueFrom<Participant[]>(
      this.send<Participant[]>({ cmd: INVITE_ROOM }, payload)
    );
  }
  findParticipant(payload: User): Promise<Participant[]> {
    return lastValueFrom<Participant[]>(
      this.send<Participant[]>({ cmd: FIND_ALL_PARTICIPANT }, payload)
    );
  }
}
