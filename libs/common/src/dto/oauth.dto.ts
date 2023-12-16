import {CreateUserRequest} from "@app/authentication/dto/authenticaion.dto";


export interface OAuthData {
  access_token: string;
  refresh_token: string;
  user: CreateUserRequest;
}
