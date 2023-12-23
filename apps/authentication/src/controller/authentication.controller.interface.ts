import {
  CreateUserRequestByOAuth,
  LoginUserRequest,
  LoginUserResponse,
} from "@app/authentication/dto/authenticaion.dto";

export interface AuthenticationController {
  signIn(loginUserRequest: LoginUserRequest): Promise<LoginUserResponse>;

  googleSignIn(data: CreateUserRequestByOAuth): Promise<LoginUserResponse>;

  googleSignIn(data: CreateUserRequestByOAuth): Promise<LoginUserResponse>;

  googleSignIn(data: CreateUserRequestByOAuth): Promise<LoginUserResponse>;
}
