import { Body, Controller, Post, Get, Param, Query } from "@nestjs/common";
import { UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { RoomService } from "./room.service";
import { ApiOperation, ApiCreatedResponse, ApiTags } from "@nestjs/swagger";
import { CreateRoom } from "./dto/chatting.createRoom.dto";
import { GetUser } from "src/auth/get-user.decorator";
import { User } from "src/users/users.entity";
import { Room } from "./room.entity";
import { InviteToRoom } from "./dto/chatting.inviteToRoom.dto";
import { Participant } from "./participant.entity";
import { Chatting } from "./chatting.entity";
import { RoomListResponse } from "./dto/room.roomListResponse.dto";

@Controller("chatting")
@UseGuards(AuthGuard())
@ApiTags("채팅방")
export class ChattingController {
  constructor(private chattingService: RoomService) {}

  @Get("")
  @ApiOperation({
    summary: "유저의 채팅방 리스트 API",
    description: "유저의 채팅방 리스트를 불러옵니다.",
  })
  @ApiCreatedResponse({ description: "등록된 친구중 친구정보를 변경합니다." })
  async GetRoomList(@GetUser() user: User): Promise<Array<RoomListResponse>> {
    return await this.chattingService.GetRooms(user);
  }

  @Get("chattings/:id")
  @ApiOperation({
    summary: "유저의 채팅방 대화를 가져옵니다. API",
    description: "유저의 채팅방 리스트를 불러옵니다.",
  })
  @ApiCreatedResponse({ description: "등록된 친구중 친구정보를 변경합니다." })
  async GetChattingList(
    @Param("id") id: number,
    @Query("cursor") cursor: number
  ): Promise<Chatting[]> {
    return await this.chattingService.getChattingList(id, cursor);
  }

  @Post("add")
  @ApiOperation({
    summary: "채팅방방 생성하기 API",
    description: "채팅방을 생성합니다.",
  })
  @ApiCreatedResponse({
    description:
      "참가자를 선택하면 자동으로 채팅방 종류가 만들어지고, 채팅방이 생성이 됩니다.",
  })
  async CreateRoom(
    @Body() createRoom: CreateRoom,
    @GetUser() user: User
  ): Promise<Room> {
    return this.chattingService.createRoom(createRoom, user);
  }

  @Post("invite")
  @ApiOperation({
    summary: "채팅방에 초대하기 API",
    description: "채팅방에 원하는 참가자를 초대합니다.",
  })
  @ApiCreatedResponse({ description: "채팅방에 원하는 참가자를 초대합니다." })
  async InviteRoom(
    @Body() inviteToRoom: InviteToRoom,
    @GetUser() user: User
  ): Promise<Participant[]> {
    return this.chattingService.InviteRoom(inviteToRoom);
  }
}
