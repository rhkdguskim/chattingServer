import { Controller, Inject } from "@nestjs/common";
import { MessagePattern } from "@nestjs/microservices";
import {
  SIGN_IN,
} from "../authentication.message";
import { UserEntity } from "../entity/users.entity";
import {AuthenticationService} from "../providers/authentication.service.interface";
import {AuthenticationController} from "./authentication.controller.interface";
import {AUTHENTICATION_SERVICE} from "../authentication.metadata";
import {LoginUserRequest, LoginUserResponse} from "@app/authentication/dto/authenticaion.dto";


@Controller()
export class AuthenticationControllerMicroservice
  implements AuthenticationController
{
  constructor(
    @Inject(AUTHENTICATION_SERVICE)
    private readonly authenticationService: AuthenticationService
  ) {}
  @MessagePattern({ cmd: SIGN_IN })
  async signIn(payload: LoginUserRequest): Promise<LoginUserResponse> {
    return await this.authenticationService.signIn(payload);
  }
}
