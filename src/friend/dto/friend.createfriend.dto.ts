import { IsNumber, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateFriendRequest {
  @IsNumber()
  @ApiProperty({ description: "친구 아이디" })
  friend_id: number;

  @ApiProperty({ description: "친구 이름" })
  @IsString()
  friend_name: string;
}

export class CreateFriendResponse {
  @IsNumber()
  @ApiProperty({ description: "친구 아이디" })
  friend_id: number;

  @ApiProperty({ description: "친구 이름" })
  @IsString()
  friend_name: string;
}

export class DelteFriendRequest {
  @IsNumber()
  @ApiProperty({ description: "친구 아이디" })
  friend_id: number;
}