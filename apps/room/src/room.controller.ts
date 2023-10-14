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
import { Room } from "@app/common/entity";
import { Participant } from "@app/common/entity";
import { MessagePattern } from "@nestjs/microservices";
import {
  CREATE_ROOM,
  FIND_ALL_PARTICIPANT,
  FIND_ALL_ROOM,
  FIND_ROOM,
  INVITE_ROOM,
  UPDATE_ROOM,
} from "@app/common/message/room";
import { User } from "@app/common/entity";

@Controller("room")
@ApiTags("채팅방")
export class RoomController {
  constructor(private roomService: RoomService) {}

  @MessagePattern({ cmd: FIND_ALL_ROOM })
  async GetRoomList(payload: number): Promise<Array<RoomListResponse>> {
    return await this.roomService.GetUserRooms(payload);
  }

  @MessagePattern({ cmd: FIND_ROOM })
  async findRoom(payload: number): Promise<Room> {
    return await this.roomService.getRoombyID(payload);
  }

  @MessagePattern({ cmd: UPDATE_ROOM })
  async updateRoom(payload: Room) {
    return this.roomService.updateRoomStatus(payload);
  }

  @MessagePattern({ cmd: CREATE_ROOM })
  async CreateRoom(payload: CreateRoomReqeust): Promise<CreateRoomResponse> {
    return await this.roomService.createRoom(payload);
  }
  @MessagePattern({ cmd: INVITE_ROOM })
  async InviteRoom(payload: InviteRoomRequest): Promise<Participant[]> {
    return await this.roomService.InviteRoom(payload);
  }

  @MessagePattern({ cmd: FIND_ALL_PARTICIPANT })
  async findParticipant(payload: User) {
    return await this.roomService.GetParticipants(payload);
  }
}
