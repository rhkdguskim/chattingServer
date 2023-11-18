import {
  Injectable,
  BadRequestException,
  Logger,
  Inject,
  LoggerService,
  ForbiddenException,
} from "@nestjs/common";
import {
  CreateRoomReqeust,
  CreateRoomResponse,
} from "@app/common/dto/room.dto";
import { RoomType } from "@app/common/dto/room.dto";
import { RoomListResponse, InviteRoomRequest } from "@app/common/dto/room.dto";
import { ValidateCreateRoom } from "@app/common/decoration/room.deco";
import { create } from "domain";
import {
  ParticipantTypeORM,
  RoomTypeORM,
  UserTypeORM,
} from "@app/common/typeorm/entity";
import { UserResponse } from "@app/common/dto";
import { ROOM_SERVICE } from "@app/common/message/room";
import { IRoomClient } from "@app/common/clients/room.interface.client";

@Injectable()
export class RoomService {
  constructor(
    @Inject(ROOM_SERVICE)
    private readonly roomClient: IRoomClient,

    @Inject(Logger)
    private readonly logger: LoggerService
  ) {}

  async createRoom(
    createRoomDto: CreateRoomReqeust
  ): Promise<CreateRoomResponse> {
    return await this.roomClient.CreateRoom(createRoomDto);
  }

  async InviteRoom(
    inviteToRoom: InviteRoomRequest
  ): Promise<ParticipantTypeORM[]> {
    return await this.roomClient.InviteRoom(inviteToRoom);
  }

  async GetUserRooms(user_id: number): Promise<Array<RoomListResponse>> {
    return await this.roomClient.findRoom(user_id);
  }
}
