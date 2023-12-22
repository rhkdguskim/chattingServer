import { IsOptional, IsString, Matches } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateUserRequest {
  constructor(createUserRequest: CreateUserRequest) {
    if (createUserRequest) {
      this.user_id = createUserRequest.user_id;
      this.name = createUserRequest.name;
      this.password = createUserRequest.password;
      this.status_msg = createUserRequest.status_msg;
    }
  }
  @IsString()
  @ApiProperty({ description: "User ID" })
  user_id: string;

  @ApiProperty({ description: "User Name" })
  @IsString()
  name: string;

  @ApiProperty({ description: "Password" })
  @Matches(/^(?=.*[a-zA-Z])(?=.*[0-9]).*$/, {
    message: "비밀번호는 반드시 문자와 숫자 조합으로 이루어져야 합니다.",
  })
  password: string;

  @ApiProperty({ description: "상태 메세지" })
  @IsOptional()
  status_msg: string;
}

export class CreateUserRequestByOAuth extends CreateUserRequest {
  @IsString()
  @ApiProperty({ description: "access_token" })
  access_token: string;

  @IsString()
  @ApiProperty({ description: "refresh_token" })
  refresh_token: string;
}

export class CreateUserRequestOAuth extends CreateUserRequest {
  constructor(createUserRequest: CreateUserRequestOAuth) {
    super(createUserRequest);
    this.access_token = createUserRequest.access_token;
    this.refresh_token = createUserRequest.refresh_token;
  }
  @ApiProperty({ description: "access_token" })
  access_token: string;

  @ApiProperty({ description: "refresh_token" })
  refresh_token: string;
}

export class UserInfoResponse {
  constructor(user: UserInfoResponse) {
    this.id = user.id;
    this.name = user.name;
    this.user_id = user.user_id;
    this.status_msg = user.status_msg;
    this.profile_img_url = user.profile_img_url;
    this.background_img_url = user.background_img_url;
  }

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

export class UpdateUserRequest {
  constructor(updateInfo: UpdateUserRequest) {
    if (updateInfo) {
      this.user_id = updateInfo.user_id;
      this.name = updateInfo.name;
      this.status_msg = updateInfo.profile_img_url;
      this.background_img_url = updateInfo.background_img_url;
    }
  }
  @ApiProperty({ description: "아이디" })
  user_id!: string;

  @ApiProperty({ description: "이름" })
  name: string;

  @ApiProperty({ description: "상태메세지" })
  status_msg: string;

  @ApiProperty({ description: "프로필 URL" })
  profile_img_url: string;

  @ApiProperty({ description: "배경화면 URL" })
  background_img_url: string;
}
