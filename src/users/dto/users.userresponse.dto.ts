import { ApiProperty } from "@nestjs/swagger";

export class UserResponse {
  @ApiProperty({ description: "유저 ID" })
  id!: number;

  @ApiProperty({ description: "유저 이름" })
  name: string;

  @ApiProperty({ description: "유저 아이디" })
  user_id: string;

  @ApiProperty({ description: "상태 메세지" })
  status_msg: string;

  @ApiProperty({ description: "프로필 URL" })
  profile_img_url: string;

  @ApiProperty({ description: "배경 URL" })
  background_img_url: string;
}
