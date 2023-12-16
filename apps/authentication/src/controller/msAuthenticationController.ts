import { Controller, Inject } from "@nestjs/common";
import { MessagePattern } from "@nestjs/microservices";
import {
  LoginUserRequest,
  CreateUserRequest,
  OAuthRequest,
  UpdateUserRequest,
} from "@app/common/dto";
import {
  SIGN_UP,
  SIGN_IN,
  UPDATE_USER,
  FIND_ONE_USER,
  FIND_ONE_BY_ID_USER,
  FIND_ALL_USER,
  DELETE_USER,
} from "../authentication.message";
import { User } from "../entity/users.entity";
import {AuthenticationService} from "../providers/authenticationservice.interface";
import {AuthenticationController} from "./interface";
import {AUTHENTICATION_SERVICE} from "../authentication.metadata";

@Controller()
export class MsAuthenticationController
  implements AuthenticationController
{
  constructor(
    @Inject(AUTHENTICATION_SERVICE)
    private readonly authenticationService: AuthenticationService
  ) {}
  @MessagePattern({ cmd: SIGN_IN })
  async signIn(payload: LoginUserRequest): Promise<User> {
    return await this.authenticationService.signIn(payload);
  }

  @MessagePattern({ cmd: SIGN_UP })
  async signUp(payload: CreateUserRequest): Promise<User> {
    return await this.authenticationService.signIn(payload);
  }

  @MessagePattern({ cmd: UPDATE_USER })
  async update(payload: UpdateUserRequest): Promise<User | boolean> {
    return await this.authenticationService.update(payload);
  }

  @MessagePattern({ cmd: DELETE_USER })
  async delete(payload: number): Promise<any> {
    return await this.authenticationService.delete(payload);
  }

  @MessagePattern({ cmd: FIND_ONE_USER })
  async findOne(payload: number): Promise<User> {
    return await this.authenticationService.findOne(payload);
  }

  @MessagePattern({ cmd: FIND_ONE_BY_ID_USER })
  async findOneByID(payload: string): Promise<User> {
    return await this.authenticationService.findOneByID(payload);
  }

  @MessagePattern({ cmd: FIND_ALL_USER })
  async findAll(): Promise<User[]> {
    return await this.authenticationService.findAll();
  }
}
