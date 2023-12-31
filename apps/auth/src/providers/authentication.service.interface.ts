import {
  LoginUserRequest,
  LoginUserResponse,
} from "@app/auth/dto/authenticaion.dto";

export interface AuthenticationService {
  signIn(loginUser: LoginUserRequest): Promise<LoginUserResponse>;
}
