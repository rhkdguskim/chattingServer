import {Body, Controller, Post, Get, Param, Inject} from "@nestjs/common";
import { UseGuards } from "@nestjs/common";

import {
  ApiOperation,
  ApiCreatedResponse,
  ApiTags,
  ApiResponse,
  ApiProperty,
  ApiParam,
} from "@nestjs/swagger";
import {
  CreateRoomReqeust,
  CreateRoomResponse,
} from "../dto/room.dto";
import { RoomListResponse } from "../dto/room.dto";
import { InviteRoomRequest } from "../dto/room.dto";
import { JwtGuard } from "@app/authorization/guards/authorization.jwt.guard";
import {ParticipantTypeORM} from "@app/common/typeorm/entity/participant.typeorm.entity";
import {RoomLocalService} from "../providers/room.local.service";
import {ROOM_SERVICE} from "../chat.metadata";

@Controller("room")
@UseGuards(JwtGuard)
@ApiTags("채팅방")
export class RoomHttpController {
  constructor(@Inject(ROOM_SERVICE)private roomService: RoomLocalService) {}

  @Get(":id")
  @ApiOperation({
    summary: "유저의 채팅방 리스트 API",
    description: "유저의 채팅방 리스트를 불러옵니다.",
  })
  @ApiCreatedResponse({
    status: 200,
    description: "유저의 채팅방 리스트를 성공적으로 불러왔습니다.",
    type: Array<RoomListResponse>,
  })
  async GetRoomList(
    @Param("id") user_id: number
  ): Promise<Array<RoomListResponse>> {
    return await this.roomService.GetUserRooms(user_id);
  }

  @Post(":id")
  @ApiOperation({
    summary: "채팅방 생성하기 API",
    description: "채팅방을 생성합니다.",
  })
  @ApiCreatedResponse({
    description:
      "참가자를 선택하면 자동으로 채팅방 종류가 만들어지고, 채팅방이 생성이 됩니다.",
    type: CreateRoomReqeust,
  })
  async CreateRoom(
    @Body() createRoom: CreateRoomReqeust
  ): Promise<CreateRoomResponse> {
    return this.roomService.createRoom(createRoom);
  }

  @Post("invite")
  @ApiOperation({
    summary: "채팅방에 초대하기 API",
    description: "채팅방에 원하는 참가자를 초대합니다.",
  })
  @ApiCreatedResponse({
    description: "채팅방에 원하는 참가자를 초대합니다.",
    type: Array<ParticipantTypeORM>,
  })
  async InviteRoom(
    @Body() inviteToRoom: InviteRoomRequest
  ): Promise<ParticipantTypeORM[]> {
    return this.roomService.InviteRoom(inviteToRoom);
  }
}
