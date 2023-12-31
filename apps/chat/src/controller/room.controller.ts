import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Post,
  UseGuards,
} from "@nestjs/common";

import {
  ApiCreatedResponse,
  ApiOperation,
  ApiSecurity,
  ApiTags,
} from "@nestjs/swagger";
import {
  CreateRoomRequest,
  CreateRoomResponse,
  DeleteRoomRequest,
  InviteRoomRequest,
  RoomInfoResponse,
} from "../dto/room.dto";
import { JwtGuard } from "@app/auth/guard/authorization.jwt.guard";
import { ROOM_SERVICE } from "../chat.metadata";
import { ParticipantEntity } from "@app/chat/entity/participant.entity";
import { SelfGuard } from "@app/auth/guard/authorization.self.guard";
import { RoomService } from "@app/chat/providers/room.service.interface";

@Controller("room")
@UseGuards(JwtGuard, SelfGuard)
@ApiSecurity("authentication")
@ApiTags("chatroom")
export class RoomControllerImpl {
  constructor(@Inject(ROOM_SERVICE) private roomService: RoomService) {}

  @Get(":id")
  @ApiOperation({
    summary: "유저의 채팅방 리스트 API",
    description: "유저의 채팅방 리스트를 불러옵니다.",
  })
  @ApiCreatedResponse({
    status: 200,
    description: "유저의 채팅방 리스트를 성공적으로 불러왔습니다.",
    type: Array<RoomInfoResponse>,
  })
  async GetRoomList(@Param("id") user_id: number): Promise<RoomInfoResponse[]> {
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
    type: CreateRoomRequest,
  })
  async CreateRoom(
    @Param("id") user_id: number,
    @Body() createRoom: CreateRoomRequest
  ): Promise<CreateRoomResponse> {
    return await this.roomService.createRoom(user_id, createRoom);
  }

  @Delete(":id")
  @ApiOperation({
    summary: "방 삭제하기",
    description: "채팅방을 삭제합니다.",
  })
  @ApiCreatedResponse({
    description: "채팅방을 삭제합니다.",
    type: Array<ParticipantEntity>,
  })
  async deleteRoom(
    @Param("id") id: number,
    @Body() deleteRoom: DeleteRoomRequest
  ): Promise<boolean> {
    return this.roomService.deleteRoom(deleteRoom);
  }

  @Post("invite/:id")
  @ApiOperation({
    summary: "채팅방에 초대하기 API",
    description: "채팅방에 원하는 참가자를 초대합니다.",
  })
  @ApiCreatedResponse({
    description: "채팅방에 원하는 참가자를 초대합니다.",
    type: Array<ParticipantEntity>,
  })
  async InviteRoom(
    @Param("id") id: number,
    @Body() inviteToRoom: InviteRoomRequest
  ): Promise<ParticipantEntity[]> {
    return this.roomService.InviteRoom(inviteToRoom);
  }
}
