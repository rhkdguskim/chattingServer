import { Controller, Get } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import {MessagePattern} from "@nestjs/microservices";
import {LoginUserRequest, LoginUserResponse, SIGN_IN} from "@app/common";

@Controller()
export class AuthenticationController {
  constructor(private readonly authenticationService: AuthenticationService) {}
  @MessagePattern({cmd : SIGN_IN})
  async signIn(payload : LoginUserRequest): Promise<LoginUserResponse> {
    return await this.authenticationService.signIn(payload);
  }
}
