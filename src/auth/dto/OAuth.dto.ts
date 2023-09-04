import { CreateUserRequest } from "@src/users/dto/users.dto";

export interface OAuthData {
    access_token:string,
    refresh_token:string,
    user : CreateUserRequest,
}