import {
    Body,
    Controller,
    Post,
    Get,
    Param,
  } from "@nestjs/common";
  import { UseGuards } from "@nestjs/common";
  import { RoomService } from "./room.service";
  import { ApiOperation, ApiCreatedResponse, ApiTags, ApiResponse, ApiProperty, ApiParam } from "@nestjs/swagger";
  import { CreateRoomReqeust } from "./dto/chatting.dto";
  import { GetUser } from "@src/auth/get-user.decorator";
  import { User } from "@src/users/users.entity";
  import { Room } from "./room.entity";
  import { InviteToRoom } from "./dto/chatting.inviteToRoom.dto";
  import { Participant } from "./participant.entity";
  import { RoomListResponse } from "./dto/room.roomListResponse.dto";
  import { JwtAuthGuard } from "@src/auth/jwt.auth.guard";
  
  @Controller("room")
  @UseGuards(JwtAuthGuard)
  @ApiTags("채팅방")
  export class RoomController {
    constructor(private roomService: RoomService) {}
  
    @Get(":id")
    @ApiOperation({
      summary: "유저의 채팅방 리스트 API",
      description: "유저의 채팅방 리스트를 불러옵니다.",
    })
    @ApiCreatedResponse({
        status: 200,
        description: '유저의 채팅방 리스트를 성공적으로 불러왔습니다.',
        type: Array<RoomListResponse>
    })
    async GetRoomList(@Param('id') user_id : number): Promise<Array<RoomListResponse>> {
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
    })
    async CreateRoom(
      @Body() createRoom: CreateRoomReqeust,
      @Param('id') user_id : number,
    ): Promise<Room> {
      return this.roomService.createRoom(createRoom, user_id);
    }
  
    @Post("invite")
    @ApiOperation({
      summary: "채팅방에 초대하기 API",
      description: "채팅방에 원하는 참가자를 초대합니다.",
    })
    @ApiCreatedResponse({ description: "채팅방에 원하는 참가자를 초대합니다." })
    async InviteRoom(
      @Body() inviteToRoom: InviteToRoom,
    ): Promise<Participant[]> {
      return this.roomService.InviteRoom(inviteToRoom);
    }
  }
  