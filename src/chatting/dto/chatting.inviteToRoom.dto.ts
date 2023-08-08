import { ApiProperty } from '@nestjs/swagger';
import { User } from "src/users/users.entity";

export class InviteToRoom {
  @ApiProperty({ description: '구분자' })
  identifier: string;

  @ApiProperty({ description: '방이름' })
  room_name: string;

  @ApiProperty({ description: '참가유저목록' })
  participants: User[];
}