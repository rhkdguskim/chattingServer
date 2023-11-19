import {
  CreateUserRequest,
  LoginUserRequest,
  UpdateUserRequest,
} from "@app/common/dto";
import { User } from "@app/common/entity/users.entity";
import { Repository } from "../../../libs/common/src/interface";

export const AUTHENTICATION_SERVICE = "AUTHENTICATION_SERVICE";
export const AUTHENTICATION_BCRPY = "AUTHENTICATION_BCRPY";
export const AUTHENTICATION_CONTROLLER = "AUTHENTICATION_CONTROLLER";
export const USER_REPOSITORY = "USER_REPOSITORY";

export interface AuthenticationController {
  signIn(payload: LoginUserRequest): Promise<User>;
  signUp(payload: CreateUserRequest): Promise<User>;
  update(payload: UpdateUserRequest): Promise<User | boolean>;
  delete(payload: number): Promise<any>;
  findOne(payload: number): Promise<User>;
  findOneByID(payload: string): Promise<User | null>;
  findAll(): Promise<User[]>;
}

export interface AuthenticationService {
  signIn(loginUser: LoginUserRequest): Promise<User>;
  signUp(createUserDto: CreateUserRequest): Promise<User>;
  update(payload: UpdateUserRequest): Promise<User | boolean>;
  delete(payload: number): Promise<any>;
  findOne(id: number): Promise<User>;
  findOneByID(user_id: string): Promise<User | null>;
  findAll(): Promise<User[]>;
}

export interface UserRepository extends Repository<User> {
  findOneByID(user_id: string): Promise<User | null>;
}

export interface AuthenticationClient {
  SignIn(payload: LoginUserRequest): Promise<User>;
  SignUp(payload: CreateUserRequest): Promise<User>;
  update(payload: UpdateUserRequest): Promise<User>;
  delete(payload: number): Promise<User>;
  findOne(payload: number): Promise<User>;
  findOneByID(payload: string): Promise<User>;
  findAll(): Promise<User[]>;
}
