import { IsString } from "class-validator";
import { ApiProperty } from '@nestjs/swagger';
export class CreateFriendDto {
  @IsString()
  @ApiProperty({ description: '친구 아이디' })
  friend_id: string;

  @ApiProperty({ description: '친구 이름' })
  @IsString()
  friend_name: string;

}