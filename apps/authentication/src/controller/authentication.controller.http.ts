import {
  Body,
  Controller,
  Post, Delete, Get, Put,
  UseInterceptors, Inject, Param,
} from "@nestjs/common";
import { ApiTags, ApiOperation, ApiCreatedResponse } from "@nestjs/swagger";
import {AuthenticationController} from "./authentication.controller.interface";
import {AuthenticationService} from "../providers/authentication.service.interface";
import {
  LoginUserRequest,
  LoginUserResponse,
} from "@app/authentication/dto/authenticaion.dto";
import {AUTHENTICATION_SERVICE} from "@app/authentication/authentication.metadata";

@Controller("auth")
@ApiTags("Authentication")
export class AuthenticationControllerHttp implements AuthenticationController {
  constructor(@Inject(AUTHENTICATION_SERVICE)private authenticationService: AuthenticationService) {}

  @Post('signup')
  async signIn(
    @Body()loginUser: LoginUserRequest
  ): Promise<LoginUserResponse> {
    return await this.authenticationService.signIn(loginUser);
  }
}
