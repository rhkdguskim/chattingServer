import { ClientTCP, TcpClientOptions } from "@nestjs/microservices";
import { IRoomClient } from "../room.interface.client";
import {
  RoomListResponse,
  CreateRoomReqeust,
  CreateRoomResponse,
  InviteRoomRequest,
} from "@app/common/dto/room.dto";
import {
  RoomTypeORM,
  ParticipantTypeORM,
  UserTypeORM,
} from "@app/common/typeorm/entity";
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
  updateRoom(payload: RoomTypeORM): Promise<RoomTypeORM> {
    return lastValueFrom<RoomTypeORM>(
      this.send<RoomTypeORM>({ cmd: UPDATE_ROOM }, payload)
    );
  }
  CreateRoom(payload: CreateRoomReqeust): Promise<CreateRoomResponse> {
    return lastValueFrom<CreateRoomResponse>(
      this.send<CreateRoomResponse>({ cmd: CREATE_ROOM }, payload)
    );
  }
  InviteRoom(payload: InviteRoomRequest): Promise<ParticipantTypeORM[]> {
    return lastValueFrom<ParticipantTypeORM[]>(
      this.send<ParticipantTypeORM[]>({ cmd: INVITE_ROOM }, payload)
    );
  }
  findParticipant(payload: UserTypeORM): Promise<ParticipantTypeORM[]> {
    return lastValueFrom<ParticipantTypeORM[]>(
      this.send<ParticipantTypeORM[]>({ cmd: FIND_ALL_PARTICIPANT }, payload)
    );
  }
}
