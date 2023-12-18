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
import { UserEntity } from "../entity/users.entity";
import {AuthenticationService} from "./authentication.service.interface";
import {CreateUserRequest, LoginUserRequest, UpdateUserRequest} from "@app/authentication/dto/authenticaion.dto";


export class AuthenticationTcpclientService
  implements AuthenticationService
{
  private readonly tcpClientAdaptor : ClientTCP;
  constructor(options: TcpClientOptions) {
    this.tcpClientAdaptor = new ClientTCP(options['options']);
  }
  signIn(payload: LoginUserRequest): Promise<UserEntity> {
    return lastValueFrom<UserEntity>(this.tcpClientAdaptor.send<UserEntity>({ cmd: SIGN_IN }, payload));
  }

  signUp(payload: CreateUserRequest): Promise<UserEntity> {
    return lastValueFrom<UserEntity>(this.tcpClientAdaptor.send<UserEntity>({ cmd: SIGN_UP }, payload));
  }

  update(payload: UpdateUserRequest): Promise<UserEntity> {
    return lastValueFrom<UserEntity>(this.tcpClientAdaptor.send<UserEntity>({ cmd: UPDATE_USER }, payload));
  }
  delete(payload: number): Promise<UserEntity> {
    return lastValueFrom<UserEntity>(this.tcpClientAdaptor.send<UserEntity>({ cmd: DELETE_USER }, payload));
  }
  findOne(payload: number): Promise<UserEntity> {
    return lastValueFrom<UserEntity>(
        this.tcpClientAdaptor.send<UserEntity>({ cmd: FIND_ONE_USER }, payload)
    );
  }
  findOneByID(payload: string): Promise<UserEntity> {
    return lastValueFrom<UserEntity>(
        this.tcpClientAdaptor.send<UserEntity>({ cmd: FIND_ONE_BY_ID_USER }, payload)
    );
  }
  findAll(): Promise<UserEntity[]> {
    return lastValueFrom<UserEntity[]>(this.tcpClientAdaptor.send<UserEntity[]>({ cmd: FIND_ALL_USER }, {}));
  }
}
