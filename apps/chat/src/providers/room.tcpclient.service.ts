import { ClientTCP, TcpClientOptions } from "@nestjs/microservices";
import {
  RoomListResponse,
  CreateRoomResponse,
  InviteRoomRequest, CreateRoomReqeust,
} from "../dto/room.dto";

import {
  CREATE_ROOM,
  FIND_ALL_PARTICIPANT,
  FIND_ALL_ROOM,
  FIND_ROOM,
  INVITE_ROOM,
  UPDATE_ROOM,
} from "../room.message";
import { lastValueFrom } from "rxjs";
import {RoomTypeORM} from "@app/common/typeorm/entity/room.typeorm.entity";
import {ParticipantTypeORM} from "@app/common/typeorm/entity/participant.typeorm.entity";
import {UserTypeORM} from "@app/common/typeorm/entity/users.typeorm.entity";
import {RoomService} from "./room.service.interface";

export class RoomTCPClientService implements RoomService {
  private readonly clientAdaptor : ClientTCP;
  constructor(options: TcpClientOptions["options"]) {
    this.clientAdaptor = new ClientTCP(options)
  }
  GetRoomList(payload: number): Promise<RoomListResponse[]> {
    return lastValueFrom<RoomListResponse[]>(
        this.clientAdaptor.send<RoomListResponse[]>({ cmd: FIND_ALL_ROOM }, payload)
    );
  }
  findRoom(payload: number): Promise<RoomListResponse[]> {
    return lastValueFrom<RoomListResponse[]>(
        this.clientAdaptor.send<RoomListResponse[]>({ cmd: FIND_ROOM }, payload)
    );
  }
  updateRoom(payload: RoomTypeORM): Promise<RoomTypeORM> {
    return lastValueFrom<RoomTypeORM>(
        this.clientAdaptor.send<RoomTypeORM>({ cmd: UPDATE_ROOM }, payload)
    );
  }
  CreateRoom(payload: CreateRoomReqeust): Promise<CreateRoomResponse> {
    return lastValueFrom<CreateRoomResponse>(
        this.clientAdaptor.send<CreateRoomResponse>({ cmd: CREATE_ROOM }, payload)
    );
  }
  InviteRoom(payload: InviteRoomRequest): Promise<ParticipantTypeORM[]> {
    return lastValueFrom<ParticipantTypeORM[]>(
        this.clientAdaptor.send<ParticipantTypeORM[]>({ cmd: INVITE_ROOM }, payload)
    );
  }
  findParticipant(payload: UserTypeORM): Promise<ParticipantTypeORM[]> {
    return lastValueFrom<ParticipantTypeORM[]>(
        this.clientAdaptor.send<ParticipantTypeORM[]>({ cmd: FIND_ALL_PARTICIPANT }, payload)
    );
  }
}
