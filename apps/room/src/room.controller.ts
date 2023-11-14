import { Body, Controller, Post, Get, Param } from "@nestjs/common";
import { UseGuards } from "@nestjs/common";
import { RoomService } from "./room.service";
import { ApiTags } from "@nestjs/swagger";
import {
  CreateRoomReqeust,
  CreateRoomResponse,
  RoomListResponse,
  InviteRoomRequest,
} from "@app/common/dto/room.dto";
import { RoomTypeORM } from "@app/common/entity/typeorm";
import { ParticipantTypeORM } from "@app/common/entity/typeorm";
import { MessagePattern } from "@nestjs/microservices";
import {
  CREATE_ROOM,
  FIND_ALL_PARTICIPANT,
  FIND_ALL_ROOM,
  FIND_ROOM,
  INVITE_ROOM,
  UPDATE_ROOM,
} from "@app/common/message/room";
import { UserTypeORM } from "@app/common/entity/typeorm";

@Controller("room")
@ApiTags("채팅방")
export class RoomController {
  constructor(private roomService: RoomService) {}

  @MessagePattern({ cmd: FIND_ALL_ROOM })
  GetRoomList(payload: number): Promise<Array<RoomListResponse>> {
    return this.roomService.GetUserRooms(payload);
  }

  @MessagePattern({ cmd: FIND_ROOM })
  findRoom(payload: number): Promise<RoomTypeORM> {
    return this.roomService.getRoombyID(payload);
  }

  @MessagePattern({ cmd: UPDATE_ROOM })
  updateRoom(payload: RoomTypeORM) {
    return this.roomService.updateRoomStatus(payload);
  }

  @MessagePattern({ cmd: CREATE_ROOM })
  CreateRoom(payload: CreateRoomReqeust): Promise<CreateRoomResponse> {
    return this.roomService.createRoom(payload);
  }
  @MessagePattern({ cmd: INVITE_ROOM })
  InviteRoom(payload: InviteRoomRequest): Promise<ParticipantTypeORM[]> {
    return this.roomService.InviteRoom(payload);
  }

  @MessagePattern({ cmd: FIND_ALL_PARTICIPANT })
  findParticipant(payload: UserTypeORM) {
    return this.roomService.GetParticipants(payload);
  }
}
