import { ApiProperty } from "@nestjs/swagger";
import { IsString, Matches } from "class-validator";

export class UpdateUserRequest {
  @IsString()
  @ApiProperty({ description: "아이디" })
  user_id!: string;

  @IsString()
  @ApiProperty({ description: "이름" })
  name: string;

  @ApiProperty({ description: "비밀번호" })
  @Matches(/^(?=.*[a-zA-Z])(?=.*[0-9]).*$/, {
    message: "비밀번호는 반드시 문자와 숫자 조합으로 이루어져야 합니다.",
  })
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

export class CreateUserRequest {
  @IsString()
  @ApiProperty({ description: "아이디" })
  user_id: string;

  @ApiProperty({ description: "이름" })
  @IsString()
  name: string;

  @ApiProperty({ description: "비밀번호" })
  @Matches(/^(?=.*[a-zA-Z])(?=.*[0-9]).*$/, {
    message: "비밀번호는 반드시 문자와 숫자 조합으로 이루어져야 합니다.",
  })
  password: string;
}

export class LoginUserRequest {
  @IsString()
  @ApiProperty({ description: "아이디" })
  user_id: string;

  @ApiProperty({ description: "비밀번호" })
  @Matches(/^(?=.*[a-zA-Z])(?=.*[0-9]).*$/, {
    message: "비밀번호는 반드시 문자와 숫자 조합으로 이루어져야 합니다.",
  })
  password: string;
}

export class LoginUserResponse {
  @IsString()
  @ApiProperty({ description: "Access 토큰" })
  access_token: string;

  @ApiProperty({ description: "Refresh 토큰" })
  refresh_token: string;
}

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
