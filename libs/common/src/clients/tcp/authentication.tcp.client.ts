import {
  LoginUserResponse,
  LoginUserRequest,
  CreateUserRequest,
  NewTokenRequest,
  OAuthRequest,
  UpdateUserRequest,
} from "@app/common/dto/users.dto";
import { User } from "@app/common/entity";
import {
  DELETE_USER,
  FIND_ALL_USER,
  FIND_ONE_BY_ID_USER,
  FIND_ONE_USER,
  OAUTH_SIGN_IN,
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
  update(payload: UpdateUserRequest): Promise<User> {
    return lastValueFrom<User>(
      this.send<User>({ cmd: UPDATE_USER }, payload)
    );
  }
  delete(payload: number): Promise<User> {
    return lastValueFrom<User>(
      this.send<User>({ cmd: DELETE_USER }, payload)
    );
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
    return lastValueFrom<User[]>(
      this.send<User[]>({ cmd: FIND_ALL_USER }, {})
    );
  }
  oAuthSignIn(payload: OAuthRequest): Promise<User> {
    return lastValueFrom<User>(
      this.send<User>({ cmd: SIGN_IN }, payload)
    );
  }

  SignIn(payload: LoginUserRequest): Promise<User> {
    return lastValueFrom<User>(
      this.send<User>({ cmd: SIGN_IN }, payload)
    );
  }

  SignUp(payload: CreateUserRequest): Promise<User> {
    return lastValueFrom<User>(
      this.send<User>({ cmd: SIGN_UP }, payload)
    );
  }

  OAuthLogin(payload: OAuthRequest): Promise<LoginUserResponse> {
    return lastValueFrom(
      this.send<LoginUserResponse>({ cmd: OAUTH_SIGN_IN }, payload)
    );
  }
}
