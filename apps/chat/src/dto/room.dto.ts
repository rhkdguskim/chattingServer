import {ApiProperty} from "@nestjs/swagger";

import {UserResponse} from "@app/authentication/dto/authenticaion.dto";
import {RoomTypeORM} from "@app/common/typeorm/entity/room.typeorm.entity";
import {UserTypeORM} from "@app/authentication/entity/users.typeorm.entity";
import {ArrayMinSize, IsNumber, IsString} from "class-validator";


export enum RoomType {
  Individual,
  two,
  Group,
}

export class RoomListResponse {
  @ApiProperty({ description: "방 이름" })
  room_name!: string;

  @ApiProperty({ description: "참가유저목록" })
  participant!: UserResponse[];

  @ApiProperty({ description: "방 ID" })
  id: number;

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
  room!: RoomTypeORM;

  @ApiProperty({ description: "참가유저목록" })
  participants!: UserTypeORM[];

  @ApiProperty({ description: "방이름" })
  room_name!: string;
}

export class CreateRoomReqeust {
  @IsNumber()
  id: number;

  @ApiProperty({description: "방 이름"})
  @IsString()
  room_name!: string;

  @ApiProperty({description: "참가유저목록"})
  @ArrayMinSize(1, {message: "참가자 유저목록은 0명 이상이어야합니다."})
  participant!: UserResponse[];
}