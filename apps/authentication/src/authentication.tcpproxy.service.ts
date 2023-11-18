import {
  LoginUserRequest,
  CreateUserRequest,
  UpdateUserRequest,
} from "@app/common/dto/users.dto";

import {
  DELETE_USER,
  FIND_ALL_USER,
  FIND_ONE_BY_ID_USER,
  FIND_ONE_USER,
  SIGN_IN,
  SIGN_UP,
  UPDATE_USER,
} from "apps/authentication/src/authentication.message";
import { ClientTCP, TcpClientOptions } from "@nestjs/microservices";
import { lastValueFrom } from "rxjs";
import {
  AuthenticationService,
} from "apps/authentication/src/authentication.interface";
import { User } from "@app/common/entity/users.entity";

export class AuthenticationTCPClient
  extends ClientTCP
  implements AuthenticationService
{
  constructor(options: TcpClientOptions["options"]) {
    super(options);
  }
  signIn(payload: LoginUserRequest): Promise<User> {
    return lastValueFrom<User>(this.send<User>({ cmd: SIGN_IN }, payload));
  }
  signUp(payload: CreateUserRequest): Promise<User> {
    return lastValueFrom<User>(this.send<User>({ cmd: SIGN_UP }, payload));
  }

  update(payload: UpdateUserRequest): Promise<User> {
    return lastValueFrom<User>(this.send<User>({ cmd: UPDATE_USER }, payload));
  }
  delete(payload: number): Promise<User> {
    return lastValueFrom<User>(this.send<User>({ cmd: DELETE_USER }, payload));
  }
  findOne(payload: number): Promise<User> {
    return lastValueFrom<User>(
      this.send<User>({ cmd: FIND_ONE_USER }, payload)
    );
  }
  findOneByID(payload: string): Promise<User> {
    return lastValueFrom<User>(
      this.send<User>({ cmd: FIND_ONE_BY_ID_USER }, payload)
    );
  }
  findAll(): Promise<User[]> {
    return lastValueFrom<User[]>(this.send<User[]>({ cmd: FIND_ALL_USER }, {}));
  }
}
