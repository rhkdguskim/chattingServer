import { IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class UpdateUserDto {
  @IsString()
  @ApiProperty({ description: "아이디" })
  user_id!: string;

  @IsString()
  @ApiProperty({ description: "이름" })
  name: string;

  @IsString()
  @ApiProperty({ description: "비밀번호" })
  password: string;

  @IsString()
  @ApiProperty({ description: "상태메세지" })
  status_msg: string;

  @IsString()
  @ApiProperty({ description: "프로필url" })
  profile_img_url: string;

  @IsString()
  @ApiProperty({ description: "배경화면url" })
  background_img_url: string;
}
