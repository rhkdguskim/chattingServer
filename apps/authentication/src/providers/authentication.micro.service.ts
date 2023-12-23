import {
  DELETE_USER,
  FIND_ALL_USER,
  FIND_ONE_BY_ID_USER,
  FIND_ONE_USER,
  SIGN_IN,
  SIGN_UP,
  UPDATE_USER,
} from "../authentication.message";
import { ClientTCP, TcpClientOptions } from "@nestjs/microservices";
import { lastValueFrom } from "rxjs";
import { UserEntity } from "@app/user/entity/users.entity";
import { AuthenticationService } from "./authentication.service.interface";
import {
  LoginUserRequest,
  LoginUserResponse,
} from "@app/authentication/dto/authenticaion.dto";
import { CreateUserRequest, UpdateUserRequest } from "@app/user/dto/user.dto";

export class AuthenticationMicroService implements AuthenticationService {
  private readonly tcpClientAdaptor: ClientTCP;
  constructor(options: TcpClientOptions) {
    this.tcpClientAdaptor = new ClientTCP(options["options"]);
  }
  signIn(payload: LoginUserRequest): Promise<LoginUserResponse> {
    return lastValueFrom<LoginUserResponse>(
      this.tcpClientAdaptor.send<LoginUserResponse>({ cmd: SIGN_IN }, payload)
    );
  }

  register(payload: CreateUserRequest): Promise<UserEntity> {
    return lastValueFrom<UserEntity>(
      this.tcpClientAdaptor.send<UserEntity>({ cmd: SIGN_UP }, payload)
    );
  }

  updateUser(id: number, payload: UpdateUserRequest): Promise<boolean> {
    return lastValueFrom<boolean>(
      this.tcpClientAdaptor.send<boolean>({ cmd: UPDATE_USER }, payload)
    );
  }

  deleteUser(payload: number): Promise<boolean> {
    return lastValueFrom<boolean>(
      this.tcpClientAdaptor.send<boolean>({ cmd: DELETE_USER }, payload)
    );
  }
  findUserByID(payload: number): Promise<UserEntity> {
    return lastValueFrom<UserEntity>(
      this.tcpClientAdaptor.send<UserEntity>({ cmd: FIND_ONE_USER }, payload)
    );
  }
  findOneByID(payload: string): Promise<UserEntity> {
    return lastValueFrom<UserEntity>(
      this.tcpClientAdaptor.send<UserEntity>(
        { cmd: FIND_ONE_BY_ID_USER },
        payload
      )
    );
  }
  findAllUsers(): Promise<UserEntity[]> {
    return lastValueFrom<UserEntity[]>(
      this.tcpClientAdaptor.send<UserEntity[]>({ cmd: FIND_ALL_USER }, {})
    );
  }
}
