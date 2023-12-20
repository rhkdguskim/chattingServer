import {
  CreateUserRequest,
  LoginUserRequest,
  LoginUserResponse,
  UpdateUserRequest,
  UserInfoResponse,
} from "@app/authentication/dto/authenticaion.dto";

export interface AuthenticationService {
  signIn(loginUser: LoginUserRequest): Promise<LoginUserResponse>;

  register(createUserDto: CreateUserRequest): Promise<UserInfoResponse>;

  updateUser(id: number, payload: UpdateUserRequest): Promise<boolean>;

  deleteUser(id: number): Promise<boolean>;

  findUserByID(id: number | string): Promise<UserInfoResponse>;

  findAllUsers(): Promise<UserInfoResponse[]>;
}
