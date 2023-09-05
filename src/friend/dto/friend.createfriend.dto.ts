import { IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateFriendRequest {
  @IsString()
  @ApiProperty({ description: "친구 아이디" })
  friend_id: number;

  @ApiProperty({ description: "친구 이름" })
  @IsString()
  friend_name: string;
}

export class CreateFriendResponse {
  @IsString()
  @ApiProperty({ description: "친구 아이디" })
  friend_id: number;

  @ApiProperty({ description: "친구 이름" })
  @IsString()
  friend_name: string;
}

export class DelteFriendRequest {
  @IsString()
  @ApiProperty({ description: "친구 아이디" })
  friend_id: number;
}
