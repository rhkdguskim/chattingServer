import { IsString, Matches } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class LoginUserRequest {
  constructor(loginRequest: LoginUserRequest) {
    if (loginRequest) {
      this.user_id = loginRequest.user_id;
      this.password = loginRequest.password;
    }
  }

  @IsString()
  @ApiProperty({ description: "User ID" })
  user_id: string;

  @ApiProperty({ description: "User Password" })
  @Matches(/^(?=.*[a-zA-Z])(?=.*[0-9]).*$/, {
    message: "비밀번호는 반드시 문자와 숫자 조합으로 이루어져야 합니다.",
  })
  password: string;
}

export class LoginUserResponse {
  constructor(loginUserResponse: LoginUserResponse) {
    this.access_token = loginUserResponse.access_token;
    this.refresh_token = loginUserResponse.refresh_token;
  }

  @IsString()
  @ApiProperty({ description: "Access Token" })
  access_token: string;

  @ApiProperty({ description: "Refresh Token" })
  refresh_token: string;
}
