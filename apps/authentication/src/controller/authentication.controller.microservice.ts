import { Controller, Inject } from "@nestjs/common";
import { MessagePattern } from "@nestjs/microservices";
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
import {AuthenticationService} from "../providers/authentication.service.interface";
import {AuthenticationController} from "./authentication.controller.interface";
import {AUTHENTICATION_SERVICE} from "../authentication.metadata";
import {CreateUserRequest, LoginUserRequest, UpdateUserRequest} from "@app/authentication/dto/authenticaion.dto";

@Controller()
export class AuthenticationControllerMicroservice
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
    return await this.authenticationService.signUp(payload);
  }

  @MessagePattern({ cmd: UPDATE_USER })
  async updateUser(payload: UpdateUserRequest): Promise<User | boolean> {
    return await this.authenticationService.update(payload);
  }

  @MessagePattern({ cmd: DELETE_USER })
  async deleteUser(payload: number): Promise<any> {
    return await this.authenticationService.delete(payload);
  }

  @MessagePattern({ cmd: FIND_ONE_USER })
  async findUser(payload: number): Promise<User> {
    return await this.authenticationService.findOne(payload);
  }

  @MessagePattern({ cmd: FIND_ONE_BY_ID_USER })
  async findUserByID(payload: string): Promise<User> {
    return await this.authenticationService.findOneByID(payload);
  }

  @MessagePattern({ cmd: FIND_ALL_USER })
  async findAllUsers(): Promise<User[]> {
    return await this.authenticationService.findAll();
  }
}
