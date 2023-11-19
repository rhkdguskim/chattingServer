import { Controller, Get, Inject } from "@nestjs/common";
import { MessagePattern } from "@nestjs/microservices";
import { JWTRequest, JWTResponse, LoginUserResponse } from "@app/common/dto";
import { JWT_VERIFY, JWT_SIGN } from "@app/common/message/authorization";
import { AUTHORIZATION_SERVICE, AuthorizationService } from "./authorization.interface";

@Controller()
export class AuthorizationController {
  constructor(
    @Inject(AUTHORIZATION_SERVICE)
    private readonly authorizationService: AuthorizationService
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
