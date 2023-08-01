import { IsString } from "class-validator";
import { ApiProperty } from '@nestjs/swagger';
import { RoomType } from "./room.type.dto";
import { User } from "src/users/users.entity";

export class CreateRoom {
  @IsString()
  @ApiProperty({ description: '아이디' })
  my_id: string;

  @ApiProperty({ description: '방 타입' })
  type: RoomType;

  @ApiProperty({ description: '구분자' })
  identifier: string;

  @ApiProperty({ description: '방 이름' })
  room_name: string;

  @ApiProperty({ description: '참가유저목록' })
  participant: User[];
}