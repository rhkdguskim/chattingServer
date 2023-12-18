import {IsString, Matches} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";

export class CreateUserRequest {
    @IsString()
    @ApiProperty({description: "User ID"})
    user_id: string;

    @ApiProperty({description: "User Name"})
    @IsString()
    name: string;

    @ApiProperty({description: "Password"})
    @Matches(/^(?=.*[a-zA-Z])(?=.*[0-9]).*$/, {
        message: "비밀번호는 반드시 문자와 숫자 조합으로 이루어져야 합니다.",
    })
    password: string;

    access_token?: string;
    refresh_token?: string;
}

export class UserInfoResponse {
    constructor(user : UserInfoResponse) {
        this.id = user.id;
        this.name = user.name
        this.user_id = user.user_id
        this.status_msg = user.status_msg
        this.profile_img_url = user.profile_img_url
        this.background_img_url = user.background_img_url
    }

    @ApiProperty({description: "유저 ID"})
    id!: number;

    @ApiProperty({description: "유저 이름"})
    name: string;

    @ApiProperty({description: "유저 아이디"})
    user_id: string;

    @ApiProperty({description: "상태 메세지"})
    status_msg: string;

    @ApiProperty({description: "프로필 URL"})
    profile_img_url: string;

    @ApiProperty({description: "배경 URL"})
    background_img_url: string;
}

export class LoginUserRequest {
    @IsString()
    @ApiProperty({description: "User ID"})
    user_id: string;

    @ApiProperty({description: "User Password"})
    @Matches(/^(?=.*[a-zA-Z])(?=.*[0-9]).*$/, {
        message: "비밀번호는 반드시 문자와 숫자 조합으로 이루어져야 합니다.",
    })
    password: string;
}

export class LoginUserResponse {
    constructor(loginUserResponse : LoginUserResponse) {
        Object.assign(this, loginUserResponse)
    }

    @IsString()
    @ApiProperty({description: "Access Token"})
    access_token: string;

    @ApiProperty({description: "Refresh Token"})
    refresh_token: string;
}

export class UpdateUserRequest {
    @ApiProperty({description: "아이디"})
    user_id!: string;

    @ApiProperty({description: "이름"})
    name: string;

    @ApiProperty({description: "상태메세지"})
    status_msg: string;

    @ApiProperty({description: "프로필 URL"})
    profile_img_url: string;

    @ApiProperty({description: "배경화면 URL"})
    background_img_url: string;
}