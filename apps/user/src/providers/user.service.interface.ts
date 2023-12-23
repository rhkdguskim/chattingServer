import {
  CreateUserRequest,
  UpdateUserRequest,
  UserInfoResponse,
} from "@app/user/dto/user.dto";

export interface UserService {
  register(createUserDto: CreateUserRequest): Promise<UserInfoResponse>;

  updateUser(id: number, payload: UpdateUserRequest): Promise<boolean>;

  deleteUser(id: number): Promise<boolean>;

  findUserByID(id: number | string): Promise<UserInfoResponse>;

  findAllUsers(): Promise<UserInfoResponse[]>;
}
