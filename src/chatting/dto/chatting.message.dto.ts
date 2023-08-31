import { IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
import { User } from "@src/users/users.entity";
import { Room } from "../room.entity";

export class JoinRoom {
  @ApiProperty({ description: "유저정보" })
  user: User;

  @IsString()
  @ApiProperty({ description: "방" })
  room: Room;
}

export class RequestMessage {
  @ApiProperty({ description: "방 ID" })
  room_id: number;

  @IsString()
  @ApiProperty({ description: "메세지" })
  message: string;
}

export class ResponseMessage {
  @ApiProperty({ description: "채팅 ID" })
  id: number;

  @ApiProperty({ description: "방 ID" })
  room_id: number;

  @ApiProperty({ description: "보낸사람 ID" })
  user_id: number;

  @IsString()
  @ApiProperty({ description: "메세지" })
  message: string;

  @ApiProperty({ description: "읽지않은메세지" })
  not_read_chat: number;

  @ApiProperty({ description: "생성 된 시간" })
  createdAt: Date;
}
