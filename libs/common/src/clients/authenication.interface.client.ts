import {
  CreateUserRequest,
  LoginUserRequest,
  LoginUserResponse,
  OAuthRequest,
  UpdateUserRequest,
} from "../dto";
import { User } from "../entity";

export interface IAuthenticationClient {
  SignIn(payload: LoginUserRequest): Promise<User>;
  SignUp(payload: CreateUserRequest): Promise<User>;
  OAuthLogin(payload: OAuthRequest): Promise<LoginUserResponse>;
  update(payload: UpdateUserRequest): Promise<User>;
  delete(payload: number): Promise<User>;
  findOne(payload: number): Promise<User>;
  findOneByID(payload: string): Promise<User>;
  findAll(): Promise<User[]>;
  oAuthSignIn(payload: OAuthRequest): Promise<User>;
}
