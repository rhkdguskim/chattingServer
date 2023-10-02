import { Controller, Get } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import {MessagePattern} from "@nestjs/microservices";
import {LoginUserResponse} from "@src/users/dto/users.dto";
import {LoginUserRequest} from "@app/common";

@Controller()
export class AuthenticationController {
  constructor(private readonly authenticationService: AuthenticationService) {}
  @MessagePattern({cmd :"signin"})
  async signIn(payload : LoginUserRequest): Promise<LoginUserResponse> {
    return await this.authenticationService.signIn(payload);
  }
}
