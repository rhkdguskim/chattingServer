import {
  LoginUserRequest,
  LoginUserResponse,
} from "@app/authentication/dto/authenticaion.dto";

export interface AuthenticationService {
  signIn(loginUser: LoginUserRequest): Promise<LoginUserResponse>;
}
