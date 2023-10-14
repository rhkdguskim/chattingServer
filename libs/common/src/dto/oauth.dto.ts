import { CreateUserRequest } from "@app/common/dto/index";

export interface OAuthData {
  access_token: string;
  refresh_token: string;
  user: CreateUserRequest;
}
