import { Controller, Inject } from "@nestjs/common";
import { MessagePattern } from "@nestjs/microservices";
import { AUTHORIZATION_SERVICE } from "../authorization.metadata";
import { AuthorizationService } from "../providers/authorization.service.interface";
import { TokenInfoRequest, TokenInfoResponse } from "../dto/authorization.dto";
import { JWT_VERIFY } from "../authorization.message";
import { AuthorizationController } from "@app/authorization/controller/authorization.controller.interface";

@Controller()
export class AuthorizationMicroController implements AuthorizationController {
  constructor(
    @Inject(AUTHORIZATION_SERVICE)
    private readonly authorizationService: AuthorizationService
  ) {}
  @MessagePattern({ cmd: JWT_VERIFY })
  async verify(payload: TokenInfoRequest): Promise<TokenInfoResponse> {
    return this.authorizationService.verify(payload.user_id);
  }
}
