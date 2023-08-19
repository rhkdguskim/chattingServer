import { ApiProperty } from "@nestjs/swagger";
import { User } from "src/users/users.entity";
import { Room } from "../room.entity";

export class InviteToRoom {
  @ApiProperty({ description: "방ID" })
  room!: Room;

  @ApiProperty({ description: "참가유저목록" })
  participants!: User[];

  @ApiProperty({ description: "방이름" })
  room_name!: string;
}
