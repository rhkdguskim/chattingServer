import { Controller, Get } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import {MessagePattern} from "@nestjs/microservices";
import {
  LoginUserRequest,
  LoginUserResponse,
  CreateUserRequest, OAuthRequest, NewTokenRequest, UpdateUserRequest
} from "@app/common/dto";
import {
  SIGN_UP, SIGN_IN,
  GET_NEW_TOKEN,
  OAUTH_SIGN_IN, UPDATE_USER, FIND_ONE_USER,
} from "@app/common/constant";

import { User} from "@app/common/entity";

@Controller()
export class AuthenticationController {
  constructor(private readonly authenticationService: AuthenticationService) {}
  @MessagePattern({cmd : SIGN_IN})
  async signIn(payload : LoginUserRequest): Promise<LoginUserResponse> {
    return await this.authenticationService.signIn(payload);
  }

  @MessagePattern({cmd : SIGN_UP})
  async signUp(payload : CreateUserRequest): Promise<User> {
    return await this.authenticationService.create(payload);
  }

  @MessagePattern({cmd : UPDATE_USER})
  async update(payload : UpdateUserRequest): Promise<User> {
    return await this.authenticationService.update(payload);
  }

  @MessagePattern({cmd : FIND_ONE_USER})
  async findOne(payload : number): Promise<User> {
    return await this.authenticationService.findOne(payload);
  }

  @MessagePattern({cmd : GET_NEW_TOKEN})
  async refreshToken(payload : NewTokenRequest): Promise<LoginUserResponse> {
    return await this.authenticationService.getNewAccessToken(payload);
  }

  @MessagePattern({cmd : OAUTH_SIGN_IN})
  async oAuthSignIn(payload : OAuthRequest): Promise<LoginUserResponse> {
    return await this.authenticationService.OAuthLogin(payload);
  }
}
