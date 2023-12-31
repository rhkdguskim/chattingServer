import { Controller, Inject } from "@nestjs/common";
import { MessagePattern } from "@nestjs/microservices";
import { AUTHORIZATION_SERVICE } from "@app/auth/authorization.metadata";
import { AuthorizationService } from "@app/auth/providers/authorization.service.interface";
import {
  TokenInfoRequest,
  TokenInfoResponse,
} from "@app/auth/dto/authorization.dto";
import { JWT_VERIFY } from "@app/auth/authorization.message";
import { AuthorizationController } from "@app/auth/controller/authorization.controller.interface";

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
