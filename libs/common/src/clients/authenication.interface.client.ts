import {
  CreateUserRequest,
  LoginUserRequest,
  LoginUserResponse,
  OAuthRequest,
  UpdateUserRequest,
} from "../dto";
import { UserTypeORM } from "../entity/typeorm";

export interface IAuthenticationClient {
  SignIn(payload: LoginUserRequest): Promise<UserTypeORM>;
  SignUp(payload: CreateUserRequest): Promise<UserTypeORM>;
  update(payload: UpdateUserRequest): Promise<UserTypeORM>;
  delete(payload: number): Promise<UserTypeORM>;
  findOne(payload: number): Promise<UserTypeORM>;
  findOneByID(payload: string): Promise<UserTypeORM>;
  findAll(): Promise<UserTypeORM[]>;
}
