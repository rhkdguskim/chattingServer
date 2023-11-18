import { Controller, Get } from "@nestjs/common";
import { AuthorizationServiceImpl } from "./authorization.service";
import { MessagePattern } from "@nestjs/microservices";
import { JWTRequest, JWTResponse, LoginUserResponse } from "@app/common/dto";
import { JWT_VERIFY, JWT_SIGN } from "@app/common/message/authorization";

@Controller()
export class AuthorizationController {
  constructor(
    private readonly authorizationService: AuthorizationServiceImpl
  ) {}

  @MessagePattern({ cmd: JWT_VERIFY })
  async verify(payload: string): Promise<JWTResponse> {
    return this.authorizationService.verify(payload);
  }
  @MessagePattern({ cmd: JWT_SIGN })
  async sign(payload: JWTRequest): Promise<LoginUserResponse> {
    return this.authorizationService.sign(payload);
  }
}
