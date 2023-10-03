import { Controller, Get } from '@nestjs/common';
import { AuthorizationService } from './authorization.service';
import {MessagePattern} from "@nestjs/microservices";
import {LoginUserResponse} from "@app/common/dto";
import { JWT_VERIFY, JWT_SIGN} from "@app/common/message/authorization";

@Controller()
export class AuthorizationController {
  constructor(private readonly authorizationService: AuthorizationService) {}

  @MessagePattern({cmd:JWT_VERIFY})
  async verify(payload:string) : Promise<any> {
    return this.authorizationService.verify(payload)
  }
  @MessagePattern({cmd :JWT_SIGN})
  async sign(payload) : Promise<LoginUserResponse> {
    return this.authorizationService.sign(payload);
  }
}
