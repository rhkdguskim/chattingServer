import {
  CreateUserRequest,
  CreateUserRequestByOAuth,
  LoginUserRequest,
  LoginUserResponse,
  UpdateUserRequest,
  UserInfoResponse,
} from "@app/authentication/dto/authenticaion.dto";

export interface AuthenticationController {
  signIn(loginUserRequest: LoginUserRequest): Promise<LoginUserResponse>;

  googleSignIn(data: CreateUserRequestByOAuth): Promise<LoginUserResponse>;

  googleSignIn(data: CreateUserRequestByOAuth): Promise<LoginUserResponse>;

  googleSignIn(data: CreateUserRequestByOAuth): Promise<LoginUserResponse>;
}
export interface UsersController {
  signUp(payload: CreateUserRequest): Promise<UserInfoResponse>;

  updateUser(id: number, payload: UpdateUserRequest): Promise<void>;

  deleteUser(payload: number): Promise<void>;

  findUser(payload: number): Promise<UserInfoResponse>;

  findAllUsers(): Promise<UserInfoResponse[]>;
}
