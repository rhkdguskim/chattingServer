import {
  CreateUserRequest,
  UpdateUserRequest,
  UserInfoResponse,
} from "@app/user/dto/user.dto";

export interface UsersController {
  signUp(payload: CreateUserRequest): Promise<UserInfoResponse>;

  updateUser(id: number, payload: UpdateUserRequest): Promise<void>;

  deleteUser(payload: number): Promise<void>;

  findUser(payload: number): Promise<UserInfoResponse>;

  findAllUsers(): Promise<UserInfoResponse[]>;
}
