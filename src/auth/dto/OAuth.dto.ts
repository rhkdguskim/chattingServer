import { CreateUserDto } from "src/users/dto/users.createuser.dto";

export interface OAuthData {
    access_token:string,
    refresh_token:string,
    user : CreateUserDto,
}