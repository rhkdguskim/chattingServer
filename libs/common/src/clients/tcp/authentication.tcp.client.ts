import {
  LoginUserResponse,
  LoginUserRequest,
  CreateUserRequest,
  NewTokenRequest,
  OAuthRequest,
  UpdateUserRequest,
} from "@app/common/dto/users.dto";
import { UserTypeORM } from "@app/common/entity/typeorm";
import {
  DELETE_USER,
  FIND_ALL_USER,
  FIND_ONE_BY_ID_USER,
  FIND_ONE_USER,
  SIGN_IN,
  SIGN_UP,
  UPDATE_USER,
} from "@app/common/message/authentication";
import { ClientTCP, TcpClientOptions } from "@nestjs/microservices";
import { lastValueFrom } from "rxjs";
import { IAuthenticationClient } from "../authenication.interface.client";

export class AuthenticationTCPClient
  extends ClientTCP
  implements IAuthenticationClient
{
  constructor(options: TcpClientOptions["options"]) {
    super(options);
  }
  update(payload: UpdateUserRequest): Promise<UserTypeORM> {
    return lastValueFrom<UserTypeORM>(this.send<UserTypeORM>({ cmd: UPDATE_USER }, payload));
  }
  delete(payload: number): Promise<UserTypeORM> {
    return lastValueFrom<UserTypeORM>(this.send<UserTypeORM>({ cmd: DELETE_USER }, payload));
  }
  findOne(payload: number): Promise<UserTypeORM> {
    return lastValueFrom<UserTypeORM>(
      this.send<UserTypeORM>({ cmd: FIND_ONE_USER }, payload)
    );
  }
  findOneByID(payload: string): Promise<UserTypeORM> {
    return lastValueFrom<UserTypeORM>(
      this.send<UserTypeORM>({ cmd: FIND_ONE_BY_ID_USER }, payload)
    );
  }
  findAll(): Promise<UserTypeORM[]> {
    return lastValueFrom<UserTypeORM[]>(this.send<UserTypeORM[]>({ cmd: FIND_ALL_USER }, {}));
  }
  
  SignIn(payload: LoginUserRequest): Promise<UserTypeORM> {
    return lastValueFrom<UserTypeORM>(this.send<UserTypeORM>({ cmd: SIGN_IN }, payload));
  }

  SignUp(payload: CreateUserRequest): Promise<UserTypeORM> {
    return lastValueFrom<UserTypeORM>(this.send<UserTypeORM>({ cmd: SIGN_UP }, payload));
  }
}
