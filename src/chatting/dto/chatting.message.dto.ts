import { IsString } from "class-validator";
import { ApiProperty } from '@nestjs/swagger';
import { RoomType } from "./room.type.dto";
import { User } from "src/users/users.entity";

export class Message {
  @IsString()
  @ApiProperty({ description: '방 ID' })
  room_id: string;

  @ApiProperty({ description: '방 타입' })
  @IsString()
  type: RoomType;

  @ApiProperty({ description: '참가유저목록' })
  participant: User[];

  @IsString()
  @ApiProperty({ description: '메세지' })
  message: String;

  @ApiProperty({ description: '읽지않은메세지' })
  not_read_chat: number;

}