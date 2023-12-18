import {IsString} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";
import {Role, UserEntity} from "@app/authentication/entity/users.entity";

export class JWTRequest {
    constructor(user : UserEntity) {
        this.id = user.id;
        this.user_id =  user.user_id;
        this.role = user.role
    }

    @ApiProperty({description: "User indexed ID"})
    id: number;

    @ApiProperty({description: "User ID"})
    user_id: string;

    @ApiProperty({description: "Role"})
    role : Role
}

export class JWTResponse extends JWTRequest {
    iat: string;
}

export class TokenRequest {
    @IsString()
    @ApiProperty({description: "Access Token"})
    access_token : string;
}

export interface OAuthRequest {
    access_token: string;
    refresh_token: string;
}