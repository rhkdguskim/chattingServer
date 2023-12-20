import { IsNumber, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
import { FriendEntity } from "@app/friend/entity/friend.entity";

export class FindFriendRequest {
  @IsNumber()
  @ApiProperty({ description: "Friend Unique ID" })
  id: number;

  @ApiProperty({ description: "User ID" })
  @IsNumber()
  user_id: number;
}

export class FindFriendAllRequest {
  @IsNumber()
  @ApiProperty({ description: "User ID" })
  id: number;
}

export class CreateFriendRequest {
  @IsNumber()
  @ApiProperty({ description: "Friend ID" })
  friend_id: number;

  @ApiProperty({ description: "Friend Name" })
  @IsString()
  friend_name: string;
}

export class UpdateFriendRequest {
  @IsNumber()
  @ApiProperty({ description: "Friend Unique ID" })
  id: number;

  @IsNumber()
  @ApiProperty({ description: "Friend ID" })
  friend_id: number;

  @ApiProperty({ description: "Friend Name" })
  @IsString()
  friend_name: string;
}

export class CreateFriendResponse {
  constructor(friend: FriendEntity) {
    this.id = friend.id;
    this.friend_id = friend.friend_id;
    this.friend_name = friend.friend_name;
  }
  @IsNumber()
  @ApiProperty({ description: "Friend Unique ID" })
  id: number;

  @IsNumber()
  @ApiProperty({ description: "Friend ID" })
  friend_id: number;

  @ApiProperty({ description: "Friend Name" })
  @IsString()
  friend_name: string;
}

export class DeleteFriendRequest {
  @IsNumber()
  @ApiProperty({ description: "Friend Unique ID" })
  id: number;

  @IsNumber()
  @ApiProperty({ description: "Friend ID" })
  friend_id: number;
}
