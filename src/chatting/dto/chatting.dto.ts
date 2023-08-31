import { RoomType } from "./room.type.dto";

import { ApiProperty } from "@nestjs/swagger";
import { User } from "src/users/users.entity";

export class CreateRoomReqeust {
  @ApiProperty({ description: "방 이름" })
  room_name!: string;

  @ApiProperty({ description: "참가유저목록" })
  participant!: User[];
}

export class CreateRoomResponse {
    @ApiProperty({ description: "방 이름" })
    id: number;

    @ApiProperty({ description: "방 종류" })
    type: RoomType;

    @ApiProperty({ description: "방장 아이디" })
    owner_id: string;

    @ApiProperty({ description: "방 이름" })
    room_name: string;

    @ApiProperty({ description: "마지막 채팅" })
    last_chat: string;

    @ApiProperty({ description: "읽지않은 메세지" })
    not_read_chat: number;

    @ApiProperty({ description: "업데이트시간" })
    updatedAt: Date;
  }