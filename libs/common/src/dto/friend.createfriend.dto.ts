import { IsNumber, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class FindFriendAllRequest {
  @IsNumber()
  id: number;
}

export class CreateFriendRequest {
  @IsNumber()
  id: number;

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
  id: number;

  @IsNumber()
  @ApiProperty({ description: "친구 아이디" })
  friend_id: number;
}
