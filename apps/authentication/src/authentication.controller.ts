import { Controller, Get } from "@nestjs/common";
import { AuthenticationService } from "./authentication.service";
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
  OAUTH_SIGN_IN,
  UPDATE_USER,
  FIND_ONE_USER,
  FIND_ONE_BY_ID_USER,
  FIND_ALL_USER,
  DELETE_USER,
} from "@app/common/message/authentication";

import { User } from "@app/common/entity";

@Controller()
export class AuthenticationController {
  constructor(private readonly authenticationService: AuthenticationService) {}
  @MessagePattern({ cmd: SIGN_IN }) // Vaildate
  async signIn(payload: LoginUserRequest): Promise<User> {
    return await this.authenticationService.signIn(payload);
  }

  @MessagePattern({ cmd: SIGN_UP })
  async signUp(payload: CreateUserRequest): Promise<User> {
    return await this.authenticationService.create(payload);
  }

  @MessagePattern({ cmd: UPDATE_USER })
  async update(payload: UpdateUserRequest): Promise<User> {
    return await this.authenticationService.update(payload);
  }

  @MessagePattern({ cmd: DELETE_USER })
  async delete(payload: number): Promise<User> {
    return await this.authenticationService.delete(payload);
  }

  @MessagePattern({ cmd: FIND_ONE_USER })
  async findOne(payload: number): Promise<User> {
    return await this.authenticationService.findOne(payload);
  }

  @MessagePattern({ cmd: FIND_ONE_BY_ID_USER })
  async findOneByID(payload: string): Promise<User> {
    return await this.authenticationService.findbyUserId(payload);
  }

  @MessagePattern({ cmd: FIND_ALL_USER })
  async findAll(): Promise<User[]> {
    return await this.authenticationService.findAll();
  }

  @MessagePattern({ cmd: OAUTH_SIGN_IN })
  async oAuthSignIn(payload: OAuthRequest): Promise<User> {
    return await this.authenticationService.OAuthLogin(payload);
  }
}
