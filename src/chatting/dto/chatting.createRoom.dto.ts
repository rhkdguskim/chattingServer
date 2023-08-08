import { IsString } from "class-validator";
import { ApiProperty } from '@nestjs/swagger';
import { RoomType } from "./room.type.dto";
import { User } from "src/users/users.entity";

export class CreateRoom {
  @ApiProperty({ description: '방 타입' })
  type: RoomType;

  @ApiProperty({ description: '구분자' })
  identifier: string;
}