import { IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
import { UserResponse } from "src/users/dto/users.userresponse.dto";
import { RoomType } from "./room.type.dto";

export class RoomListResponse {
  @ApiProperty({ description: "방 이름" })
  room_name!: string;

  @ApiProperty({ description: "참가유저목록" })
  participant!: UserResponse[];

  @ApiProperty({ description: "방 ID" })
  id: number;

  @ApiProperty({ description: "소유자 아이디" })
  owner_id: string;

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
