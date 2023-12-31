import {
  LoginUserRequest,
  LoginUserResponse,
} from "@app/auth/dto/authenticaion.dto";

export interface AuthenticationController {
  signIn(loginUserRequest: LoginUserRequest): Promise<LoginUserResponse>;

  googleSignIn(oauthData: LoginUserRequest): Promise<LoginUserResponse>;

  kakaoSignIn(oauthData: LoginUserRequest): Promise<LoginUserResponse>;

  naverSignIn(oauthData: LoginUserRequest): Promise<LoginUserResponse>;
}
