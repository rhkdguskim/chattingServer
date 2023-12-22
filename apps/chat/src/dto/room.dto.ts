import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsOptional, IsString } from "class-validator";
import { RoomEntity, RoomType } from "@app/chat/entity/room.entity";

export class RoomInfoResponse {
  constructor(roomInfo: RoomInfoResponse) {
    this.id = roomInfo.id;
    this.owner_id = roomInfo.owner_id;
    this.room_name = roomInfo.room_name;
    this.type = roomInfo.type;
    this.last_chat = roomInfo.last_chat;
    this.updatedAt = roomInfo.updatedAt;

    this.participant = roomInfo.participant.map((participant) => {
      return new ParticipantUserInfo(participant);
    });
    if (roomInfo.not_read_chat) {
      this.not_read_chat = roomInfo.not_read_chat;
    } else {
      this.not_read_chat = 0;
    }
    if (roomInfo.last_read_chat_id) {
      this.last_read_chat_id = roomInfo.last_read_chat_id;
    } else {
      this.last_read_chat_id = 0;
    }
  }

  @ApiProperty({ description: "방 ID" })
  id: number;

  @ApiProperty({ description: "방 이름" })
  room_name!: string;

  @ApiProperty({ description: "참가유저목록" })
  participant!: ParticipantUserInfo[];

  @ApiProperty({ description: "소유자 아이디" })
  owner_id: number;

  @ApiProperty({ description: "방 종류" })
  type: RoomType;

  @ApiProperty({ description: "마지막 채팅" })
  last_chat: string;

  @ApiProperty({ description: "읽지 않은 채팅" })
  not_read_chat: number;

  @ApiProperty({ description: "마지막 채팅 채팅 ID" })
  last_read_chat_id: number;

  @ApiProperty({ description: "업데이트 일자" })
  updatedAt: Date;
}

export class CreateRoomResponse {
  constructor(createRoom: CreateRoomResponse) {
    this.id = createRoom.id;
    this.type = createRoom.type;
    this.owner_id = createRoom.owner_id;
    this.room_name = createRoom.room_name;
    this.last_chat = createRoom.last_chat;
    this.updatedAt = createRoom.updatedAt;
  }
  @ApiProperty({ description: "방 이름" })
  id: number;

  @ApiProperty({ description: "방 종류" })
  type: RoomType;

  @ApiProperty({ description: "방장 아이디" })
  owner_id: number;

  @ApiProperty({ description: "방 이름" })
  room_name: string;

  @ApiProperty({ description: "마지막 채팅" })
  last_chat: string;

  @ApiProperty({ description: "업데이트시간" })
  updatedAt: Date;
}

export class InviteRoomRequest {
  @ApiProperty({ description: "방ID" })
  room!: RoomEntity;

  @ApiProperty({ description: "참가유저목록" })
  participants!: ParticipantUserInfo[];

  @ApiProperty({ description: "방이름" })
  room_name!: string;
}

export class DeleteRoomRequest {
  @ApiProperty({ description: "Owner Change ID" })
  owner_id: number;

  @ApiProperty({ description: "Room ID" })
  room_id: number;

  @ApiProperty({ description: "User ID" })
  user_id: number;
}

export class ParticipantUserInfo {
  constructor(userInfo: ParticipantUserInfo) {
    this.id = userInfo.id;
  }
  @IsNumber()
  id: number;
}

export class CreateRoomRequest {
  constructor(createRoom: CreateRoomRequest = {} as CreateRoomRequest) {
    this.room_name = createRoom.room_name;
    this.participant = createRoom.participant;
    this.room_type = createRoom.room_type;
  }
  @ApiProperty({ description: "Room Name" })
  @IsString()
  @IsOptional()
  room_name: string = "";

  @ApiProperty({ description: "Participants Info" })
  participant: ParticipantUserInfo[];

  @ApiProperty({ description: "Room Type" })
  @IsNumber()
  @IsOptional()
  room_type: RoomType;
}
