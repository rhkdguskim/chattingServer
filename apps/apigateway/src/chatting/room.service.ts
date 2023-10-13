import {
  Injectable,
  BadRequestException,
  Logger,
  Inject,
  LoggerService,
  ForbiddenException,
} from "@nestjs/common";
import { EntityManager, Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { CreateRoomReqeust, CreateRoomResponse } from "@app/common/dto/room.dto";
import { RoomType } from "@app/common/dto/room.dto";
import { RoomListResponse, InviteRoomRequest } from "@app/common/dto/room.dto";
import { ValidateCreateRoom } from "@app/common/decoration/room.deco";
import { create } from "domain";
import {Participant, Room, User} from "@app/common/entity";
import {UserResponse} from "@app/common/dto";
import {CREATE_ROOM, FIND_ROOM, INVITE_ROOM, ROOM_SERVICE} from "@app/common/message/room";
import {ClientProxy} from "@nestjs/microservices";
import {lastValueFrom} from "rxjs";

@Injectable()
export class RoomService {
  constructor(
      @Inject(ROOM_SERVICE)
      private readonly roomClient : ClientProxy,

    @Inject(Logger)
    private readonly logger: LoggerService
  ) {}

  async createRoom(
    createRoomDto: CreateRoomReqeust
  ): Promise<CreateRoomResponse> {
    return await lastValueFrom(this.roomClient.send({cmd:CREATE_ROOM}, createRoomDto))
  }

  async InviteRoom(inviteToRoom: InviteRoomRequest): Promise<Participant[]> {
    return await lastValueFrom(this.roomClient.send({cmd:INVITE_ROOM}, inviteToRoom))
  }

  async GetUserRooms(user_id: number): Promise<Array<RoomListResponse>> {
    return await lastValueFrom(this.roomClient.send({cmd:FIND_ROOM}, user_id))
  }
}
